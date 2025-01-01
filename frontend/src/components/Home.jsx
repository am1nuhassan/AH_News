import { motion } from 'motion/react';
import PersonalizedFeed from './PersonalizedFeed';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
        }}
        className='my-[90px] flex items-center justify-center gap-5 flex-col h-64 px-4'
      >
        <h1 className='text-center text-[32px] font-black md:text-[64px]'>
          FOR YOU!
        </h1>
        <Link
          to={'/user/preferences'}
          className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300'
        >
          Personalize your feed
        </Link>
      </motion.div>
      <PersonalizedFeed />
    </div>
  );
};

export default Home;
