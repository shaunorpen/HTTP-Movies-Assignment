import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
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
          return <UpdateMovie {...props} />;
        }}
      />
    </>
  );
};

const UpdateMovie = (props) => {
  const [initialValues, setInitialValues] = useState({
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        setInitialValues({
          id: res.data.id,
          title: res.data.title,
          director: res.data.director,
          metascore: res.data.metascore,
          stars: res.data.stars.reduce((acc, star) => acc + ', ' + star)
        });
      })
      .catch(err => console.log(err.response));
  }, [props.match.params.id]);

  return (
    <div>
      <h2>Edit Movie</h2>
      <Formik key={initialValues.id}
        initialValues = {initialValues}
        validate = {values => {
          const errors = {};
          if (!values.title) {
            errors.title = 'Title is required';
          }
          if (!values.director) {
            errors.director = 'Director is required';
          }
          if (!values.metascore) {
            errors.metascore = 'Metascore is required';
          }
          if (!values.stars) {
            errors.stars = 'At least one actor is required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor='title'>Title: </label>
              <Field type='text' name='title' />
              <ErrorMessage name='title' component='span' />
            </div>
            <div>
              <label htmlFor='director'>Director: </label>
              <Field type='text' name='director' />
              <ErrorMessage name='director' component='span' />
            </div>
            <div>
              <label htmlFor='metascore'>Metascore: </label>
              <Field type='text' name='metascore' />
              <ErrorMessage name='metascore' component='span' />
            </div>
            <div>
              <label htmlFor='stars'>Stars: </label>
              <Field type='text' name='stars' />
              <ErrorMessage name='stars' Component='span' />
            </div>
            <button type='submit' disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default App;
