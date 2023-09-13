import React, { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../Context';
import '../../styles/moviedetails.css'

export default function MovieDetails({ id }) {
  const { featuredMovie } = useContext(MovieContext);
  const [item, setItem] = useState(null);
  const backgroundImage = `https://image.tmdb.org/t/p/original/${item.poster_path}`

  useEffect(() => {
    const selectedMovie = featuredMovie.find((movie) => movie.id === id);

    if (selectedMovie) {
      setItem(selectedMovie);
    }
  }, [featuredMovie, id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <section className='wrapper'>
      <aside>
        <div className='div'>
            <img src='' alt='' />
            <h3>Home</h3>
        </div>
        <div className={`div`}>
            <img src='' alt='' />
            <h3>Movies</h3>
        </div>
        <div className='div'>
            <img src='' alt='' />
            <h3>TV Series</h3>
        </div>
        <div className='div'>
            <img src='' alt='' />
            <h3>Upcoming</h3>
        </div>
      </aside>
      <div className='movie-details-wrapper'>
        <div className='movie-image'  style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className='watch'>
            <img src='' alt='watch-icon' />
            <h3>Watch Trailer</h3>
          </div>
        </div>
        <div className='key-details'>
          <h3>{item.title}</h3>
          <h3>{item.release_date}</h3>
          <h3>duration</h3>
        </div>
        <div className='others'>
          <h3>{item.overview}</h3>
        </div>
      </div>
    </section>
  );
}
