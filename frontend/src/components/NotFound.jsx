import { useNavigate } from 'react-router-dom';
import notFoundSvg from '../assets/404.svg';
import { ArrowLeft, House } from 'lucide-react';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='text-center'>
        <img
          src={notFoundSvg}
          alt='404 - Not Found'
          height={'200px'}
          width={'250px'}
        />
        <h1 className='mt-3 text-[32px] '>Page Not Found</h1>
        <div className='flex justify-between'>
          <a
            href='#'
            className='px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-600 flex gap-2'
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeft />
            Go back
          </a>
          <a
            href='/'
            className='px-4 py-2 bg-white text-slate-900 rounded hover:bg-slate-200 flex gap-2'
          >
            <House />
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
