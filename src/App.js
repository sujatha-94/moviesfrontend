
import React, { useState, useEffect } from 'react';
import ButtonAppBar from './components/Header';
import PersistentDrawerLeft from './components/Sidebar';
import MovieGrid from './components/MovieGrid';
import MovieGridRedux from "./components/MovieGridRedux";
import { useDispatch, useSelector } from 'react-redux';
import { clearMovies } from './redux/movieActions';
import { Box, Toolbar } from '@mui/material'; 



function App() {
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

 
  useEffect(() => {
    if (movies.length > 0) {
      dispatch(clearMovies());
    }
  }, [dispatch, movies.length]); // Dependency on movies.length to clear when it changes

  return (
    <div className="App">
      <ButtonAppBar />
      <PersistentDrawerLeft onCategorySelect={handleCategorySelect} />
      <Toolbar sx={{ justifyContent: 'center', marginTop: '64px' }}>
        {/* Removed buttons for adding, removing, updating, and clearing movies */}
      </Toolbar>
      <main style={{ marginLeft: "240px", marginTop: "32px" }}>
        <MovieGrid selectedCategory={selectedCategory} />
        <MovieGridRedux />
      </main>

    </div>
  );
}

export default App;
