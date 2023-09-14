import React, { useContext, useEffect } from 'react';
import { MovieContext } from './Context';
import imbd from '../assets/imdb.svg'
import tomato from '../assets/tomato.svg'
import '../styles/movielist.css'
import { Link } from 'react-router-dom';

export default function Movie() {
  const { featuredMovie } = useContext(MovieContext);

  return (
    <section>
      <div className='heading'>
          <h2>Featured Movie</h2>
          <Link to="/">See more</Link>
      </div>
      <div className='movie-wrapper'>
        {
          featuredMovie ? 
            featuredMovie.slice(0, 10).map((movie, index) => (
              <div data-testid='movie-card' key={index} className='movie-info'>
                <Link  to={`/movies/${movie.id}`}>
                  <img data-testid='movie-poster' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                </Link>
                <h3 data-testid='movie-title'>{movie.title}</h3>
                <div className="tips">
                  <div> <img src={imbd} alt='imbd'/> {movie.vote_average}</div>
                  <div> <img src={tomato} alt='fruit'/> {movie.vote_average * 10}%</div>
                </div>
                <div>
                    <div data-testid='movie-release-date'>{new Date(movie.release_date).toISOString()}</div>
                </div>
              </div>
            )) : 
          null
        }
      </div>
    </section>
  );
}
