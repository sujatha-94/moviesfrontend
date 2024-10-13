import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Moviegrid.css";

const API_KEY = "9320f923d506550f84b0e5a4d4e6c97b";
const API_BASE_URL = "https://api.themoviedb.org/3";

const categoryEndpoints = {
  'Popular': `${API_BASE_URL}/movie/popular`,
  'Top Rated': `${API_BASE_URL}/movie/top_rated`,
  'Upcoming': `${API_BASE_URL}/movie/upcoming`,
  'Action': `${API_BASE_URL}/discover/movie?with_genres=28`,
  'Adventure': `${API_BASE_URL}/discover/movie?with_genres=12`,
  'Animation': `${API_BASE_URL}/discover/movie?with_genres=16`,
  'Comedy': `${API_BASE_URL}/discover/movie?with_genres=35`,
  'Horror': `${API_BASE_URL}/discover/movie?with_genres=27`, 
  'Thriller': `${API_BASE_URL}/discover/movie?with_genres=53`,
};

const MovieGrid = ({ selectedCategory }) => {
  const favoriteMovieIds = [1, 5, 10, 18, 25, 30, 36, 39, 44, 49, 50, 55, 56, 60,66, 79, 82, 88,94,95]; 
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const categoryEndpoint = categoryEndpoints[selectedCategory] || categoryEndpoints['Popular'];

        // Helper function to fetch a specific page of results
        const fetchPage = async (page) => {
          const response = await axios.get(categoryEndpoint, {
            params: {
              api_key: API_KEY,
              language: 'en-US',
              page
            },
            timeout: 10000
          });
          return response.data.results;
        };

        // Fetch multiple pages (for example, 5 pages to get 100 movies)
        const pages = await Promise.all([
          fetchPage(1),
          fetchPage(2),
          fetchPage(3),
          fetchPage(4),
          fetchPage(5)
        ]);


        const allMovies = pages.flat(); // Flattening the array of arrays
        setMovies(allMovies);
        setError(null);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
        setError("Unable to fetch movies. Please try again later.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedCategory]);

  return (
    <div className="movie-grid">
      {loading && <p>Loading movies...</p>}
      {error && <div className="error-message">{error}</div>}
      {movies.length === 0 && !loading && !error && <p>No movies found for this category.</p>}
      <div className="movie-grid-content">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150'}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
            <p>Rating: {movie.vote_average} / 10</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;

