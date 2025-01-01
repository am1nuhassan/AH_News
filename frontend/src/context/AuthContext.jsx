import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const validateToken = async () => {
        try {
          const response = await axios.get(apiUrl + '/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const user = response.data;
          if (user) {
            setIsAuthenticated(true);
            setUser(user);
            setToken(token);
            localStorage.setItem('user', JSON.stringify(user));
          }
        } catch (error) {
          console.error('Token validation failed:', error);
        }
      };
      validateToken();
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(apiUrl + '/login', {
      email,
      password,
    });
    setUser(response.data.user);
    setToken(response.data.token);
    setIsAuthenticated(true);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  };

  const register = async (name, email, password) => {
    await axios.post(apiUrl + '/register', {
      name,
      email,
      password,
      password_confirmation: password,
    });
  };

  const logout = async () => {
    console.log(token);
    await axios.post(
      apiUrl + '/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
