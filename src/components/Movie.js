import React, { useContext, useEffect, useState } from 'react';
import { MovieContext } from './Context';
import imbd from '../assets/imdb.svg'
import tomato from '../assets/tomato.svg'
import '../styles/movielist.css'
import { Link, Navigate } from 'react-router-dom';

export default function Movie() {
  const { featuredMovie, setFeaturedMovie, setMovie } = useContext(MovieContext);

  return (
    <section>
        <div className='heading'>
            <h2>Featured Movie</h2>
            <a>see more</a>
        </div>
      
      <div className='movie-wrapper'>
        {
          featuredMovie ? 
            featuredMovie.map((movie, index) => (
              <Link  to={`/movies/${movie.id}`}>
                <div data-testid='movie-card' key={index} className='movie-info'>
                    <img data-testid='movie-poster' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                    <h3 data-testid='movie-title'>{movie.original_title}</h3>
                    <div className="tips">
                      <div> <img src={imbd} alt='imbd'/> {movie.vote_average}</div>
                      <div> <img src={tomato} alt='fruit'/> 97%</div>
                    </div>
                    <div>
                        <div data-testid='movie-release-date'>Release Date (UTC): {movie.release_date}</div>
                    </div>
                </div>
              </Link>
                
            )) : 
          null
        }
      </div>
    </section>
  );
}
