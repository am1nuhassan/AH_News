import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import NotFound from './components/NotFound';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import User from './components/User';
import Search from './components/Search';
import Preferences from './components/Preferences';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  {
    path: '/user',
    element: (
      <ProtectedRoute>
        <User />
      </ProtectedRoute>
    ),
    children: [
      { path: 'home', element: <Home /> },
      { path: 'search', element: <Search /> },
      { path: 'preferences', element: <Preferences /> },
    ],
  },
  { path: '/signin', element: <Signin /> },
  { path: '/signup', element: <Signup /> },
  { path: '*', element: <NotFound /> },
]);

export default router;
