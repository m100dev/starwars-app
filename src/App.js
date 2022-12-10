import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
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
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error &&<p>There are no movies.</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
