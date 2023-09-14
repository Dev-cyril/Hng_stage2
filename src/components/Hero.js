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
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="search-icon">
                  <path
                    d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
                  ></path>
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
