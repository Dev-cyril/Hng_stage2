import React, { useContext, useEffect, useState } from 'react';
import '../../styles/moviedetails.css'
import home from '../../assets/Home.svg'
import movie from '../../assets/Movie Projector.svg'
import tv from '../../assets/TV Show.svg'
import calendar from '../../assets/Calendar.svg'
import play from '../../assets/Play.svg'
import Loading from '../Loading'
import { useParams } from 'react-router-dom';

export default function MovieDetails() {
  const [item, setItem] = useState(null);
  const { id } = useParams()

  const url = `https://api.themoviedb.org/3/movie/${id}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmE2NTAzOTZjNDFhYTM4NDlmNjY1ZWQxOWM5NzQ2OSIsInN1YiI6IjY0ZmUzM2M0ZWZlYTdhMDBjMzk1ODc4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CfRP0JDY3PwJfVPEQ4jqQXxJi8h9PvU6dw02vOXSDhs'
    }
  };

  const getData = async () => {
    try{
      const response = await fetch(url, options)
      const responseData = await response.json()
      setItem(responseData)
    }
    catch (err){
      alert(err)
    }
  }

  useEffect(() => {
    getData()
  }, [id]);

  if (!item) {
    return <Loading />
  }

  const backgroundImage = `https://image.tmdb.org/t/p/original/${item.poster_path}`;

  return (
    <section className='wrapper'>
      <aside>
        <div className='div'>
            <img src={home} alt='home' />
            <h3>Home</h3>
        </div>
        <div className={`div`}>
            <img src={movie} alt='movies' />
            <h3>Movies</h3>
        </div>
        <div className='div'>
            <img src={tv} alt='tv' />
            <h3>TV Series</h3>
        </div>
        <div className='div'>
            <img src={calendar} alt='' />
            <h3>Upcoming</h3>
        </div>
      </aside>
      <div className='movie-details-wrapper'>
        <div className='movie-image' style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className='watch'>
            <img src={play} alt='watch-icon' />
            <h3>Watch Trailer</h3>
          </div>
        </div>
        <div className='key-details'>
          <h3 data-testid='movie-title'>{item.title}</h3>
          <h3 data-testid='movie-release-date'>{new Date(item.release_date).toISOString()}</h3>
          <h3 data-testid='movie-runtime'>{item.runtime}</h3> <span>min</span>
        </div>
        <div className='others'>
          <h5 data-testid='movie-overview'>{item.overview}</h5>
        </div>
      </div>
    </section>
  );
}
