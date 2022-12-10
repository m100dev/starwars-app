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
      const response = await fetch('https://swapi.dev/api/films');
      
      // Checks if we got a 200 status code, if not throw an error
      if (!response.ok) {
        throw new Error('Oops! Something went wrong...');
      }

      // Formats the data retrieved into JSON
      const data = await response.json();

      // Shape the data in object for use in our MovieList / Movie component
      const transformedMovies = data.results.map((movieData) => {
        return ({
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        });
      });

      // update the movie state
      setMovies(transformedMovies);

    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  // Using useEffect 
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
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
