import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=2727';

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export const CREATE_POST = 'create_post';

export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
    // After API call, invoke callback fn
    .then( () => callback() )

  return {
    type: CREATE_POST,
    payload: request
  }
}

export const FETCH_POST = 'fetch_post';

export function fetchPost(id, callback) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

export const DELETE_POST = 'delete_post';

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    // After API call, invoke our callback
    .then( () => callback() )

  return {
    type: DELETE_POST,
    payload: id
  };
}
