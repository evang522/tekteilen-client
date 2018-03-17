import axios from 'axios';
import {API_URL} from '../config';


export const login = credentials => (dispatch,getState) => {
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

//=================================== ASYNC USER ACTIONS ==================>
export const fetchUsers = () => (dispatch, getState) => {
  const axOptions = {
    headers: {
      'Authorization':`Bearer ${getState().reducers.authToken || localStorage.getItem('Authtoken') || null}`,
    }
  }
  axios.get(`${API_URL}/users`, axOptions)
    .then(response => {
      dispatch(populateUsers(response.data));
    })
}

export const setLocalStorage = (token) => {
  localStorage.setItem('Authtoken', token)
}

export const clearLocalStorage = () => {
  localStorage.removeItem('Authtoken');
}

export const logoutAsync = () => dispatch =>{
    localStorage.removeItem('Authtoken');
    dispatch(hideLogoutDialogue());
    dispatch(logout());
    
}




//==========================================ASYNC PROJECT ACTIONS ===================>

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



export const addProjectAsync = (project) => (dispatch,getState) => {
  const headers=  {
    'Authorization':`Bearer ${localStorage.getItem('Authtoken') || null}`,
    'Content-Type': 'application/json'
  }

    axios({
      method:'POST',
      url: `${API_URL}/projects`,
      data: JSON.stringify(project),
      headers,
    })
      .then(response =>{

        console.log('AXIOSRESPONSE: ', response);
        dispatch(addProject(response.data))
      })
}


export const deleteProjectAsync = (projectId) => (dispatch, getState) => {
  const headers=  {
    'Authorization':`Bearer ${localStorage.getItem('Authtoken') || null}`,
    'Content-Type': 'application/json'
  }

  axios({
    method:'DELETE',
    url:`${API_URL}/projects/${projectId}`,
    headers
  })
  .then(response => {
    dispatch(deleteProject(projectId));
  })

}



//==================SYNC ACTIONS================================================>

export const SET_TOKEN = 'SET_TOKEN';
export const setToken = token => ({
  type:SET_TOKEN,
  token
})

export const SET_PROJECT_REDIRECT = 'SET_PROJECT_REDIRECT';
export const setProjectRedirect = token => ({
  type:SET_PROJECT_REDIRECT,
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

export const CLEAR_REDIRECTS = 'CLEAR_REDIRECTS';
export const clearRedirects = () => ({
  type:CLEAR_REDIRECTS
})


export const SET_LOADING = 'SET_LOADING';
export const setLoading = () => {
  return {
  type:SET_LOADING
  }
}


export const POPULATE_PROJECTS = 'POPULATE_PROJECTS';
export const populateProjects = projects => ({
  type:POPULATE_PROJECTS,
  projects
})


export const POPULATE_USERS = 'POPULATE_USERS';
export const populateUsers = users => ({
  type:POPULATE_USERS,
  users
})


export const ADD_PROJECT = 'ADD_PROJECT';
export const addProject = project => ({
  type:ADD_PROJECT,
  project
})

export const DELETE_PROJECT = 'DELETE_PROJECT';
export const deleteProject = projectId => ({
  type:DELETE_PROJECT,
  projectId
})


export const SHOWLOGOUT_DIALOGUE = 'SHOWLOGOUT_DIALOGUE';
export const showLogoutDialogue = () => ({
  type:SHOWLOGOUT_DIALOGUE
})

export const HIDELOGOUT_DIALOGUE = 'HIDELOGOUT_DIALOGUE';
export const hideLogoutDialogue = () => ({
  type:HIDELOGOUT_DIALOGUE
})

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
  type:LOGOUT
})

