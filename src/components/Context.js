import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MovieDetails from './pages/MovieDetails';
import ErrorPage from './pages/ErrorPage';

export const MovieContext = createContext();

export default function Context() {
  const [movie, setMovie] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [searchItem, setSearchItem] = useState(null)

  const url =
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const param = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmE2NTAzOTZjNDFhYTM4NDlmNjY1ZWQxOWM5NzQ2OSIsInN1YiI6IjY0ZmUzM2M0ZWZlYTdhMDBjMzk1ODc4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CfRP0JDY3PwJfVPEQ4jqQXxJi8h9PvU6dw02vOXSDhs',
    },
  };

  const getApiData = async () => {
    try {
      const response = await fetch(url, param);
      const data = await response.json();
      setFeaturedMovie(data.results.slice(0, 10));
      localStorage.setItem('movies', data.results)
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);


  return (
    <MovieContext.Provider value={{ movie, setMovie, featuredMovie, setFeaturedMovie, searchItem, setSearchItem }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {
            movie?
            movie.map((movieData) => (
            <Route
              key={movieData.id}
              path={`/movies/${movieData.id}`}
              element={<MovieDetails id={movieData.id} />}
            />
          )) :null
          }
          {
            featuredMovie?
            featuredMovie.map((movieData) => (
            <Route
              key={movieData.id}
              path={`/movies/${movieData.id}`}
              element={<MovieDetails id={movieData.id} />}
            />
          )) :null
          }
          <Route path='/404-Not-found' element={<ErrorPage/>} />
          <Route path="*" element={<Navigate to="/404-Not-found" />} />
        </Routes>
      </Router>
    </MovieContext.Provider>
  );
}
