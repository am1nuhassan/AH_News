import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const { login, register } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      await login(email, password);
      navigate('/user/home');
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };
  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <Link to={'/'}>
          <h1 className='mt-10 text-center text-4xl font-bold'>AH News</h1>
        </Link>
        <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
          Sign up
        </h2>
      </div>
      {error !== null ? (
        <div className='bg-red-500 p-4 text-white rounded-lg my-4'>
          <p>{error.response.data.message}</p>
        </div>
      ) : (
        ''
      )}
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form
          className='space-y-6'
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor='name'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Name
            </label>
            <div className='mt-2'>
              <input
                type='text'
                name='name'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                type='email'
                name='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='email'
                required
                className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Password
              </label>
              <div className='text-sm'></div>
            </div>
            <div className='mt-2'>
              <input
                type='password'
                name='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='current-password'
                required
                className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sign up
            </button>
          </div>
        </form>

        <p className='mt-10 text-center text-sm/6 text-gray-500'>
          Already have an account? &nbsp;
          <a
            href='/signin'
            className='font-semibold text-blue-600 hover:text-indigo-500'
          >
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
