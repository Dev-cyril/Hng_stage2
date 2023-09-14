import React, { useContext, useEffect } from 'react';
import { MovieContext } from './Context';
import imbd from '../assets/imdb.svg'
import tomato from '../assets/tomato.svg'
import '../styles/movielist.css'
import { Link } from 'react-router-dom';

export default function Movie() {
  const { featuredMovie } = useContext(MovieContext);

  const url ='https://api.themoviedb.org/3/genre/movie/list?language=en'
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmE2NTAzOTZjNDFhYTM4NDlmNjY1ZWQxOWM5NzQ2OSIsInN1YiI6IjY0ZmUzM2M0ZWZlYTdhMDBjMzk1ODc4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CfRP0JDY3PwJfVPEQ4jqQXxJi8h9PvU6dw02vOXSDhs'
    }
  };
  // const getGenre = async () =>{
  //   try{
  //     const response = await fetch(url, options)
  //     const responseData = await response.json()
  //     responseData.forEach(genre => {
  //       featuredMovie.forEach(obj => {
  //         if(genre.id === obj.genres_id)
  //       });
  //     });
  //   }
  //   catch (err){
  //     console.log(err)
  //   }
  // }

  // useEffect(() =>{
  //   getGenre()
  // }, [])

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
              <Link  to={`/movies/${movie.id}`}>
                <div data-testid='movie-card' key={index} className='movie-info'>
                    <img data-testid='movie-poster' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                    <h3 data-testid='movie-title'>{movie.title}</h3>
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
