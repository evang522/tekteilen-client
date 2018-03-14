import {API_URL} from '../config';

export const getAllProjects = (forceUpdate=false) => (dispatch,getState) => { 
  const {projects} = getState().reducers;
  if (!forceUpdate && projects.length) { 
    return;
  }
  console.log(`from the state [${getState().reducers.authToken}]`)
  console.log(`from the localStorage [${localStorage.getItem('Authtoken')}]`);
  dispatch(setLoading());
  return fetch(`${API_URL}/projects`, {
    headers: {
      // 'Authorization':`Bearer ${getState().reducers.authToken || localStorage.getItem('Authtoken') || null}`
      // 'Authorization': `Bearer ${localStorage.getItem('Authtoken')}`,
      'Authorization': `Bearer testtest`,
      'Content-Type':'application/json'
    },
    method:'get',
    
  })
    .then(response => {
      if (response.status === 403) {
        const err = new Error();
        err.message = 'Not Authenticated, please Login.'
        return Promise.reject(err);
      }
      console.log('server response from fetch', response);
       response.json()
    })
    .then(projects => {
      console.log('projects from getall', projects);
      dispatch(populateProjects(projects))
      console.log(getState());
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