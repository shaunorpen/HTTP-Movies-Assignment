import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import { AddOrUpdateMovie } from './Movies/AddOrUpdateMovie';
import 'bulma/css/bulma.css';

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div className='container'>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <AddOrUpdateMovie {...props} />;
        }}
      />
      <Route
        path="/add-movie"
        render={props => {
          return <AddOrUpdateMovie {...props} />;
        }}
      />
    </div>
  );
};

export default App;
