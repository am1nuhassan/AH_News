import { useState, useEffect, useRef } from 'react';
import ArticleCard from './ArticleCard';

import axios from 'axios';

const PersonalizedFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchedPages = useRef(new Set());

  const fetchArticlesUrl = import.meta.env.VITE_API_URL + '/personalized-feed';

  useEffect(() => {
    if (fetchedPages.current.has(currentPage)) return;
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          fetchArticlesUrl + `?page=${currentPage}`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
        setArticles((prevArticles) => [...prevArticles, ...response.data.data]);
        setTotalPages(response.data.last_page);
        fetchedPages.current.add(currentPage);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
    console.log(currentPage);
  }, [currentPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className='w-full max-w-7xl mx-auto mb-8'>
      <div className='w-full px-4 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
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

export default PersonalizedFeed;
