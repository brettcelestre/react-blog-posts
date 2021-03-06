import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from '../actions/index';

class PostsNew extends Component {

  renderField(field, type){

    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          type="text"
          className="form-control"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values){
    // Submits values through createPost action
    this.props.createPost(values, () => {
      // Callback fn navigates to '/' route
      this.props.history.push('/');
    });
  }

  render(){
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="title"
          label="Title"
          component={this.renderField}
          className=""
        />
        <Field
          name="categories"
          label="Categories"
          component={this.renderField}
        />
        <Field
          name="content"
          label="Post Content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// Validates Field values
function validate(values){
  const errors = {};
  // Validate the inputs from 'values'
  if ( !values.title ) {
    errors.title = "Enter a title!";
  } else if ( !values.categories ) {
    errors.categories = "Enter at least one category!";
  } else if ( !values.content ) {
    errors.content = "Enter some content! GEOFF SAYS!!!!";
  }

  // If errors is empty, the form is fine to submit
  return errors;
}

// Connects reduxForm with validate fn and PostNewForm
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  // Connects createPost fn from actions to PostsNew component props
  connect(null, { createPost })(PostsNew)
);
