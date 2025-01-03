import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }}
      className='my-[90px] flex items-center justify-center gap-5 flex-col h-96 px-4'
    >
      <p className='text-slate-900 text-5xl font-bold text-center md:text-8xl'>
        STAY INFORMED
      </p>
      <p className='text-slate-900 text-2xl'>With Stories Just For You!</p>
      <Link to={'/signup'}>
        <button className='py-3 px-5 bg-slate-900 text-white font-semibold rounded-md text-lg hover:bg-slate-700'>
          Sign Up
        </button>
      </Link>
    </motion.div>
  );
};

export default Hero;
