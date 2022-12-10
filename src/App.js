import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {  
      // Makes an HTTP GET request
      const response = await fetch('https://react-http-847a9-default-rtdb.firebaseio.com/movies.json');
      
      // Checks if we got a 200 status code, if not throw an error
      if (!response.ok) {
        throw new Error('Oops! Something went wrong...');
      }

      // Formats the data retrieved into JSON
      const data = await response.json();

      const loadedMovies = [];

      // Parses through the new data object and creates a new array of objects with desired shape.
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        });
      };

      // update the movie state
      setMovies(loadedMovies);

    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  // Using useEffect 
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  // Used to add a new movie
  async function addMovieHandler(movie) {
    const response = await fetch('https://react-http-847a9-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
  };

  let content =<p>Couldn't find a movie</p>;

  if( movies.length > 0 ) {
    content = <MoviesList movies={movies} />;
  } 

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
