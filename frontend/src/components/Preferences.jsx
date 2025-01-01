import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Preferences = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  // State for selected preferences
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  const token = localStorage.getItem('token');
  const userId = JSON.parse(localStorage.getItem('user')).id;

  // State for available options (fetched from the backend)
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  const preferencesUrl = import.meta.env.VITE_API_URL + '/preferences';
  // Fetch available options from the backend
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(preferencesUrl + '/options', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSources(response.data.sources);
        setCategories(response.data.categories);
        setAuthors(response.data.authors);
      } catch (error) {
        console.error('Failed to fetch options:', error);
      }
    };

    const getSavedPreferences = async () => {
      try {
        const response = await axios.get(preferencesUrl + '/saved', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSelectedSources(response.data.sources);
        setSelectedCategories(response.data.categories);
        setSelectedAuthors(response.data.authors);
      } catch (error) {
        console.error('Failed to fetch saved preferences:', error);
      }
    };
    fetchOptions();
    getSavedPreferences();
  }, []);

  // Handle preference selection
  const handleSourceChange = (source) => {
    setSelectedSources(
      (prev) =>
        prev.includes(source)
          ? prev.filter((s) => s !== source) // Deselect
          : [...prev, source] // Select
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleAuthorChange = (author) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author]
    );
  };

  // Save preferences
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        preferencesUrl,
        {
          user_id: userId,
          sources: selectedSources,
          categories: selectedCategories,
          authors: selectedAuthors,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Prefrences Saved Succesfully.');
    } catch (error) {
      console.error('Failed to save preferences:', error);
      setError('Failed to save preferences.');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 py-28 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-center mb-8 text-gray-800'>
          Customize Your Newsfeed
        </h1>

        <form
          onSubmit={handleSubmit}
          className='space-y-8'
        >
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-gray-700'>
              Preferred News Sources
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {sources.map((source) => (
                <label
                  key={source}
                  className='flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors'
                >
                  <input
                    type='checkbox'
                    checked={selectedSources.includes(source)}
                    onChange={() => handleSourceChange(source)}
                    className='form-checkbox h-5 w-5 text-blue-600 rounded'
                  />
                  <span className='text-gray-700'>{source}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-gray-700'>
              Preferred Categories
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {categories.map((category) => (
                <label
                  key={category}
                  className='flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors'
                >
                  <input
                    type='checkbox'
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className='form-checkbox h-5 w-5 text-blue-600 rounded'
                  />
                  <span className='text-gray-700'>{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Authors */}
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-gray-700'>
              Preferred Authors
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {authors.map((author) => (
                <label
                  key={author}
                  className='flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors'
                >
                  <input
                    type='checkbox'
                    checked={selectedAuthors.includes(author)}
                    onChange={() => handleAuthorChange(author)}
                    className='form-checkbox h-5 w-5 text-blue-600 rounded'
                  />
                  <span className='text-gray-700'>{author}</span>
                </label>
              ))}
            </div>
          </div>

          {message !== null ? (
            <div
              className='bg-green-100 border border-green-400 text-green-700 px-
            4 py-3 rounded text-sm'
            >
              {message}
            </div>
          ) : (
            ''
          )}
          {error !== null ? (
            <div>
              <p className='text-red-500'>{error}</p>
            </div>
          ) : (
            ''
          )}
          <button
            type='submit'
            className='w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors'
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
};

export default Preferences;
