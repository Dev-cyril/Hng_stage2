import React, { useContext, useState, useEffect } from 'react';
import '../styles/hero.css';
import { MovieContext } from './Context';
import play from '../assets/Play.svg';
import imbd from '../assets/imdb.svg'
import tomato from '../assets/tomato.svg'
import logo from '../assets/Logo.svg'
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
                placeholder="What do you want to watch"
                aria-label="Search through site content"
              />
              <button className="search-button">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
