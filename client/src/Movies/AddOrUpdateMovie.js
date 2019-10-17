import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

export const AddOrUpdateMovie = (props) => {
    const addOrEdit = props.match.params.id ? 'Edit' : 'Add';

    const [initialValues, setInitialValues] = useState({
      id: '',
      title: '',
      director: '',
      metascore: '',
      stars: [],
    });
  
    useEffect(() => {
      props.match.params.id && axios
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
      <div className='section'>
        <h2 className='title'>{addOrEdit} Movie</h2>
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
          onSubmit={values => {
            if (addOrEdit === 'Edit') {
              const updatedValues = {
                ...values,
                stars: values.stars.split(', ')
              };
              axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, updatedValues)
              .then(res => {
                props.history.push(`/movies/${values.id}`);
                values = initialValues;
              })
              .catch(err => {
                alert(err.message);
              });
            } else {
              const newMovie = {
                ...values,
                stars: values.stars.split(', ')
              };
              axios.post('http://localhost:5000/api/movies', newMovie)
              .then(res => {
                props.history.push('/');
                values = initialValues;
              })
              .catch(err => {
                alert(err.message);
              });
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className='field'>
                <label htmlFor='title' className='label'>Title: </label>
                <Field type='text' name='title' className='input' />
                <ErrorMessage name='title' component='span' className='help' />
              </div>
              <div className='field'>
                <label htmlFor='director' className='label'>Director: </label>
                <Field type='text' name='director' className='input' />
                <ErrorMessage name='director' component='span' className='help' />
              </div>
              <div className='field'>
                <label htmlFor='metascore' className='label'>Metascore: </label>
                <Field type='text' name='metascore' className='input' />
                <ErrorMessage name='metascore' component='span' className='help' />
              </div>
              <div className='field'>
                <label htmlFor='stars' className='label'>Stars: </label>
                <Field type='text' name='stars' className='input' />
                <ErrorMessage name='stars' Component='span' className='help' />
              </div>
              <button type='submit' disabled={isSubmitting} className='button is-link'>Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    )
}
