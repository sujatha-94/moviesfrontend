

import axios from "axios";

const API_KEY = "5bd5c02dfda89a18593a4a1b3e06e6fe"; // Replace with your actual TMDB API key
const API_BASE_URL = "https://api.themoviedb.org/3";

// Action Types
export const SET_MOVIES = 'SET_MOVIES';
export const ADD_MOVIE = 'ADD_MOVIE';
export const REMOVE_MOVIE = 'REMOVE_MOVIE';
export const UPDATE_MOVIE = 'UPDATE_MOVIE';
export const CLEAR_MOVIES = 'CLEAR_MOVIES';

// Fetch Movies Action
export const fetchMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
      },
      timeout: 10000, // Set timeout to 30 seconds
    });

    dispatch({
      type: SET_MOVIES,
      payload: response.data.results,
    });
  } catch (error) {
    console.error('Error fetching movies:',error.response ? error.response.data : error.message);

    dispatch({
      type: 'FETCH_MOVIES_FAILURE',
      payload: error.message,
    });
  }
};

// Add Movie Action
export const addMovie = (movie) => {
  return {
    type: ADD_MOVIE,
    payload: movie,
  };
};

// Remove Movie Action
export const removeMovie = (movieId) => {
  return {
    type: REMOVE_MOVIE,
    payload: movieId,
  };
};

// Update Movie Action
export const updateMovie = (movie) => {
  return {
    type: UPDATE_MOVIE,
    payload: movie,
  };
};

// Clear Movies Action
export const clearMovies = () => {
  return {
    type: CLEAR_MOVIES,
  };
};
