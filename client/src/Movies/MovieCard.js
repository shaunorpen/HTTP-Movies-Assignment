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
        <h3>Stars</h3>
        {stars.map(star => (
          <div key={star}>
            {star}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
