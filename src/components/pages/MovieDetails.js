import React, { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../Context';
import '../../styles/moviedetails.css'
import home from '../../assets/Home.svg'
import movie from '../../assets/Movie Projector.svg'
import tv from '../../assets/TV Show.svg'
import calendar from '../../assets/Calendar.svg'
import play from '../../assets/Play.svg'
import Loading from '../Loading'

export default function MovieDetails({ id }) {
  const { featuredMovie } = useContext(MovieContext);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const selectedMovie = featuredMovie.find((movie) => movie.id === id);

    if (selectedMovie) {
      setItem(selectedMovie);
    }
  }, [featuredMovie, id]);

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
          <h3>{item.title}</h3>
          <h3>{item.release_date}</h3>
          <h3>Runtime</h3>
        </div>
        <div className='others'>
          <h5>{item.overview}</h5>
        </div>
      </div>
    </section>
  );
}
