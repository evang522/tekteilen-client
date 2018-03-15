import axios from 'axios';
import {API_URL} from '../config';

export const getAllProjects = (forceUpdate=false) => (dispatch,getState) => { 
  const {projects} = getState().reducers;
  if (!forceUpdate && projects.length) { 
    return;
  }
  dispatch(setLoading());
  const fetchOptions = {
      headers: {
      'Authorization':`Bearer ${getState().reducers.authToken || localStorage.getItem('Authtoken') || null}`,
      'Content-Type':'application/json'
    },
  };
  return axios.get(`${API_URL}/projects`, 
      fetchOptions
    )
    .then(projects => {
      dispatch(populateProjects(projects.data))
    })
    .catch(err => {
      err.message = err.message || 'Internal Server Error! Sorry, we\'re working to fix this a quickly as possible';
      dispatch(setError(err));
    })
}

export const login = (credentials) => (dispatch,getState) => {
  const userCreds = {
    email:credentials.email,
    password: credentials.password
  }

  return fetch(`${API_URL}/login`,
  {
    method:'POST',
    body:JSON.stringify(userCreds),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => res.json())
    .then(data => {
      setLocalStorage(data.token);
      dispatch(setToken(data.token))
    })
    .catch(err => {
      dispatch(setError(err));
    })
}

export const setLocalStorage = (token) => {
  localStorage.setItem('Authtoken', token)
}

export const clearLocalStorage = () => {
  localStorage.removeItem('Authtoken');
}

export const logoutAsync = () => dispatch =>{
  console.log('logout was called');
    localStorage.removeItem('Authtoken');
    dispatch(logout());
}


export const SET_TOKEN = 'SET_TOKEN';
export const setToken = token => ({
  type:SET_TOKEN,
  token
})


export const SET_ERROR = 'SET_ERROR';
export const setError = err => ({
  type:SET_ERROR,
  err
})


export const CLEAR_ERROR = 'CLEAR_ERROR';
export const clearError = () => ({
  type:CLEAR_ERROR
})


export const SET_LOADING = 'SET_LOADING';
export const setLoading = () => {
  return {
  type:SET_LOADING
  }
}


export const POPULATE_PROJECTS = 'POPULATE_PROJECTS';
export const populateProjects = (projects) => ({
  type:POPULATE_PROJECTS,
  projects
})


export const LOGOUT = 'LOGOUT';
export const logout = () => ({
  type:LOGOUT
})