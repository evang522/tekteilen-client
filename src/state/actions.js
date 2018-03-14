import {API_URL} from '../config';

export const getAllProjects = (forceUpdate=false) => (dispatch,getState) => { 
  const {projects} = getState().reducers;
  if (!forceUpdate && projects.length) { 
    return;
  }
  dispatch(setLoading());
  return fetch(`${API_URL}/projects`)
    .then(response => response.json())
    .then(projects => dispatch(populateProjects(projects)))
    .catch(err => {
      err.message = 'Internal Server Error! Sorry, we\'re working to fix this a quickly as possible';
      err.status = 500;
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
    .then(data => dispatch(setToken(data.token)))
    .catch(err => {
      dispatch(setError(err));
    })
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


// export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT';
// export const setCurrentProject = (id) => ({
//   type:SET_CURRENT_PROJECT,
//   id
// })