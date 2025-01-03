import React from 'react';

import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import PlaceholderImage from '../assets/placeholder.png';

const ArticleCard = ({ article }) => {
  return (
    <Link
      to={article.url}
      target='_blank'
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeIn' }}
        className='min-h-[600px] px-4 py-4 border rounded-md cursor-pointer'
      >
        <div className='flex justify-between mb-4'>
          <p className='text-gray-500'>{article.source}</p>
        </div>
        <img
          src={article.imageUrl === null ? PlaceholderImage : article.imageUrl}
          className='w-full h-[300px] border rounded-md mb-4'
          loading='lazy'
          alt={article.title}
        />
        <div className='flex justify-between'>
          <p className='text-gray-400 mb-4'>{article.published_at}</p>
          <p>{article.category}</p>
        </div>
        <h2 className='text-2xl font-bold mb-2 text-slate-900'>
          {article.title}
        </h2>
        <p className='mb-3'>{article.desc}</p>
        <p className='text-gray-500'>{article.author}</p>
      </motion.div>
    </Link>
  );
};

export default ArticleCard;
