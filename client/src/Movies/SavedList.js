import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
export default class SavedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="saved-list">
        <h3>Saved Movies:</h3>
        {this.props.list.map(movie => {
          return (
            <NavLink
              to={`/movies/${movie.id}`}
              key={movie.id}
              activeClassName="saved-active"
            >
              <span className="saved-movie">{movie.title}</span>
            </NavLink>
          );
        })}
        <div className='button-container'>
          <div className="home-button">
            <Link to="/">Home</Link>
          </div>
          <div className="add-movie-button">
            <Link to="/add-movie">Add Movie</Link>
          </div>
        </div>
      </div>
    );
  }
}
