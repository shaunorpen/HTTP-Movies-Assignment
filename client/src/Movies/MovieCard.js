import React from 'react';

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  return (
    <div className="card">
      <div className="card-header">
        <h2 className='card-header-title'>{title}</h2>
      </div>
      <div className='card-content'>
        <div>
          Director: <em>{director}</em>
        </div>
        <div>
          Metascore: <em>{metascore}</em>
        </div>
        Stars: <em>{stars.map((star, idx, arr) => idx === arr.length - 1 ? star : star.concat(', ') )}</em>
      </div>
    </div>
  );
};

export default MovieCard;
