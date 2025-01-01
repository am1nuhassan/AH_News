import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import Filters from './Filters';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Filter states
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');

  // Dynamic filter options
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);

  const searchArticlesUrl = import.meta.env.VITE_API_URL + '/articles';

  const searchArticles = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await axios.get(searchArticlesUrl, {
        params: {
          keyword: searchTerm,
          page: currentPage,
          category: category,
          source: source,
          date: date,
        },
      });
      if (response.data.total === 0) {
        setError(true);
        setErrorMessage('No articles found.');
      }
      setArticles((prevArticles) => [...prevArticles, ...response.data.data]);
      setTotalPages(response.data.last_page);

      /* const uniqueCategories = [
        ...new Set(response.data.data.map((article) => article.category)),
      ];
      const uniqueSources = [
        ...new Set(response.data.data.map((article) => article.source)),
      ];
      setCategories(uniqueCategories);
      setSources(uniqueSources); */
    } catch (error) {
      console.error(error);
      setError(true);
      setErrorMessage('Failed to fetch articles.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setArticles([]);
    setTotalPages(0);
    setCurrentPage(1);
    if (searchTerm.trim() === '') {
      setError(true);
      setErrorMessage('Search term cannot be empty!');
    } else {
      searchArticles();
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Fetch articles when filters change
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      setArticles([]);
      searchArticles();
    }
  }, [category, source, date]);

  // Fetch articles when pagination changes
  useEffect(() => {
    if (currentPage > 1) {
      searchArticles();
    }
  }, [currentPage]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/preferences/options`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setCategories(data.categories);
        setSources(data.sources);
      } catch (err) {
        console.error('Failed to fetch filter options.', err);
      }
    };

    fetchFilterOptions();
  }, []);

  // Reset filters
  const resetFilters = () => {
    setCategory('');
    setSource('');
    setDate('');
  };

  return (
    <div className='w-full flex flex-col justify-center'>
      <div className='my-24'>
        <h1 className='text-center text-[32px] font-black md:text-[64px]'>
          Search
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className='w-100 flex flex-col items-center gap-4 max-w-7xl mx-auto'
      >
        <input
          type='text'
          name='search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search'
          className='block border border-slate-900 rounded-md p-2 h-16 text-[18px]'
        />
        <Filters
          category={category}
          setCategory={setCategory}
          source={source}
          setSource={setSource}
          date={date}
          setDate={setDate}
          categories={categories}
          sources={sources}
          resetFilters={resetFilters}
        />
        <button
          type='submit'
          disabled={searchTerm.trim() === ''}
          className={`py-5 px-8 bg-slate-900 rounded-md mx-4 text-white w-36 ${
            searchTerm.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Search
        </button>
      </form>
      <div className='my-20 w-full max-w-7xl mx-auto'>
        <div className='w-full px-4 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {loading ? (
            <h2 className='text-center text-[24px]'>Searching...</h2>
          ) : (
            ''
          )}
          {error ? (
            <h2 className='text-center text-[24px]'>{errorMessage}</h2>
          ) : (
            ''
          )}
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
            />
          ))}
        </div>
        {currentPage < totalPages && (
          <div className='flex justify-center mt-4'>
            <button
              onClick={handleLoadMore}
              className='px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-600'
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
