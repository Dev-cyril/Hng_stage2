import React, { useContext, useState, useEffect } from 'react';
import '../styles/hero.css';
import { MovieContext } from './Context';
import play from '../assets/Play.svg';
import imbd from '../assets/imdb.svg'
import tomato from '../assets/tomato.svg'
import logo from '../assets/logo.webp'
import menu from '../assets/Menu.svg'

export default function Hero() {
  const { movie, setMovie } = useContext(MovieContext);
  const [heromovie, setHeroMovie] = useState({})
  const [backgroundImage, setBackgroundImage] = useState('');

  const url = '//api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmE2NTAzOTZjNDFhYTM4NDlmNjY1ZWQxOWM5NzQ2OSIsInN1YiI6IjY0ZmUzM2M0ZWZlYTdhMDBjMzk1ODc4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CfRP0JDY3PwJfVPEQ4jqQXxJi8h9PvU6dw02vOXSDhs'
    }
  };

  const fetchMovie = async () =>{
    try{
      const response = await fetch(url, options)
      const movieData = await response.json()
      setMovie(movieData.results)
    }
    catch(err){
      alert(err)
    }
  }

  const getRandom = () => {
    if(movie.length > 0){
      const random = movie[Math.floor(Math.random() * movie.length)];
      setBackgroundImage(`https://image.tmdb.org/t/p/original/${random.poster_path}`);
      setHeroMovie(random)
    }
    
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  useEffect(() => {
    getRandom()
  }, [movie]);

  return (
    <div className="hero-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className="header" data-section-theme="dark">
        <div className="container">
          <div className="header-container">
            <div className="header-logo">
              <a href="#">
                <img src={logo} alt="movie db"/> <h2>MovieBox</h2>
              </a>
            </div>
            <form action="#" method="post" className="form-search">
              <input
                type="search"
                name="q"
                id="search-input"
                placeholder="What do you want to watch?"
                aria-label="Search through site content"
              />
              <button className="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill='#fff' d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                </svg>
              </button>
            </form>
            <div className='signin'>
              <h3>Sign In</h3> <img src={menu} alt='' />
            </div>
          </div>
        </div>
      </header>
      <section className="hero-section">
        <div className="text">
          <h2>{heromovie.title}</h2>
          <div className="tips">
            <div> <img src={imbd} alt='imbd'/> {heromovie.vote_average}</div>
            <div> <img src={tomato} alt='fruit'/> 97%</div>
          </div>
          <h4 className="summary">{heromovie.overview}</h4>
          <button>
            {' '}
            <img src={play} alt="Play" /> WATCH TRAILER
          </button>
        </div>
      </section>
    </div>
  );
}
