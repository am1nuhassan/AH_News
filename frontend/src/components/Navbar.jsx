import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronDown, Search, UserCircle } from 'lucide-react';
import axios from 'axios';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    logout();
  };

  const user = localStorage.getItem('user');
  const userData = JSON.parse(user);
  return (
    <nav
      className={`w-full flex items-center py-3 px-3 fixed top-0 border bg-white`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to={isAuthenticated ? 'home' : '/'}
          className='flex items-center gap-2'
        >
          <p className='text-black text-[28px] font-bold cursor-pointer flex'>
            AH News
          </p>
        </Link>

        {isAuthenticated ? (
          <div className='flex items-center gap-2'>
            <Link
              to={'search'}
              className='mx-3'
            >
              <div className='flex gap-2'>
                <Search />
                <div className='hidden sm:block'>Search</div>
              </div>
            </Link>
            <div className='relative'>
              <button
                onClick={toggleDropdown}
                className='flex items-center focus:outline-none'
              >
                <UserCircle className='mr-1' />
                <div className='hidden sm:flex sm:items-center'>
                  {userData.name}
                  <ChevronDown className='w-4 h-4 ml-2' />
                </div>
              </button>

              {isOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200'>
                  <ul className='py-2'>
                    <li>
                      <a
                        href='preferences'
                        className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                      >
                        Preferences
                      </a>
                    </li>

                    <li>
                      <button
                        onClick={handleLogout}
                        className='w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='flex gap-4'>
            <Link to={'/signup'}>
              <button className='text-white bg-slate-900 px-4 py-2 rounded-md font-semibold hover:bg-slate-700'>
                Sign Up
              </button>
            </Link>
            <Link to={'/signin'}>
              <button className='text-slate-900 border border-slate-900 px-4 py-2 font-semibold rounded-md hover:bg-slate-400'>
                Sign In
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
