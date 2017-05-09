import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPost } from '../actions/index';

class PostsShow extends Component {

  componentDidMount() {
    // Pulls ':id' off of the URL
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  render() {
    const { post } =  this.props;

    if (!post ) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// { posts } pulls from state.
// this.props equals ownProps
// We return an obj with id from URL, similar to line 10
// This returns the single post, instead of all posts
function mapStateToProps( { posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost } )(PostsShow);
