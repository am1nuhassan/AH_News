import { useState, useEffect } from 'react';
import CategoriesButton from './CategoriesButton';
import ArticleCard from './ArticleCard';
import Logo from '/vite.svg';

import axios from 'axios';

const Feed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [activeCategory, setActiveCategory] = useState('All');
  const [isFav, setIsFav] = useState(false);

  const fetchArticlesUrl = import.meta.env.VITE_API_URL + '/articles';

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          fetchArticlesUrl +
            `?${
              activeCategory === 'All' ? '' : 'category=' + activeCategory + '&'
            }page=${currentPage}`
        );
        setArticles((prevArticles) => [...prevArticles, ...response.data.data]);
        setTotalPages(response.data.last_page);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [currentPage, activeCategory]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const toggleFav = () => {
    setIsFav((prev) => !prev);
  };

  const categories = [
    'All',
    'Article',
    'World News',
    'Technology',
    'Sport',
    'Football',
    'Business',
    'Music',
    'Culture',
    'Politics',
    'Travel',
  ];

  return (
    <div className='w-full max-w-7xl mx-auto mb-8'>
      <div className='flex space-x-4 border-b'>
        {categories.map((category) => (
          <CategoriesButton
            key={category}
            label={category}
            isActive={activeCategory === category}
            onClick={() => {
              setActiveCategory(category);
              setArticles([]);
              setCurrentPage(1);
            }}
          />
        ))}
      </div>
      <div className='w-full px-4 py-4 grid grid-cols-3 gap-4'>
        {loading ? <h2 className='text-center text-[24px]'>Loading...</h2> : ''}
        {error ? (
          <h2 className='text-center text-[24px]'>No articles found!</h2>
        ) : (
          ''
        )}
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            isFav={isFav}
            toggleFav={toggleFav}
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
  );
};

export default Feed;
