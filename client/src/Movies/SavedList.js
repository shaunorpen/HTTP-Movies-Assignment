import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
export default class SavedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="level">
        <div className='level-left'>
          <h3 className='title'>Saved Movies:</h3>
          {this.props.list.map(movie => {
          return (
          <NavLink
          to={`/movies/${movie.id}`}
          key={movie.id}
          activeClassName="saved-active"
          >
          <div className="tile is-child">{movie.title}</div>
          </NavLink>
          );
          })}
        </div>
        <div className='level-right'>
          <div className="button is-primary">
           <Link to="/">Home</Link>
          </div>
          <div className="button is-success">
            <Link to="/add-movie">Add Movie</Link>
          </div>
        </div>
      </div>
    );
  }
}
