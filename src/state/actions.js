import axios from 'axios';
import {API_URL} from '../config';
import {toastr} from 'react-redux-toastr';




//=================================== ASYNC USER / AUTH ACTIONS ==================>
export const fetchUsers = () => (dispatch, getState) => {
  if (getState().reducers.userInfo) {
  const axOptions = {
    headers: {
      'Authorization':`Bearer ${getState().reducers.authToken || localStorage.getItem('Authtoken') || null}`,
    }
  }
  axios.get(`${API_URL}/users`, axOptions)
    .then(response => {
      dispatch(populateUsers(response.data));
    })
    .catch(err => {
      err.message = 'Unable to contact server. We are working to resolve this ASAP. Thanks for your patience!'
      toastr.message('App Error', 'We\'re having a hard time reaching the server right now. Please refresh and try again', {position:'top-center'});
    })
  }
}

export const setLocalStorage = (token) => {
  localStorage.setItem('Authtoken', token)
}

export const clearLocalStorage = () => {
  localStorage.removeItem('Authtoken');
}

export const logoutAsync = (toastrSuccess) => dispatch =>{
    dispatch(setLoading());
    localStorage.removeItem('Authtoken');
    dispatch(hideLogoutDialogue());
    dispatch(logout());
    toastrSuccess();
    dispatch(clearLoading());
}

export const login = (credentials,errorToast, successToast) => (dispatch,getState) => {
  dispatch(setLoading());
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
      if (data.status===400) {
        dispatch(clearLoading());
        return errorToast()

      }
      successToast();
      dispatch(clearLoading());
      setLocalStorage(data.token);
      dispatch(setToken(data.token))
      
    })
    .catch(err => {
      toastr.message('App Error', 'We\'re having a hard time reaching the server right now. Please refresh and try again', {position:'top-center'});
      dispatch(clearLoading());
    })
}


// TODO This code is awful and needs to be redone
export const register = credentials => dispatch => {
  dispatch(setLoading());
  const requiredFields = ['fullname','password','email'];

  requiredFields.forEach(field => {
    if (!(field in credentials)) {
      const err = new Error();
      err.message = 'Missing required fields';
      return dispatch(setError(err, 'USER'));
    }
  });
 const newUser = Object.assign({}, credentials);

    axios({
      url:`${API_URL}/users`,
      headers: {
        'Content-Type':'application/json',
      },
      method:'POST',
      data: JSON.stringify(newUser)
    })
      .then(response => {
        dispatch(clearLoading());
        toastr.success('Welcome to TekTeilen!');
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 400) {
            dispatch(clearLoading());
            return toastr.error(err.response.data.message);
          }
        }
        toastr.message('App Error', 'We\'re having a hard time reaching the server right now. Please refresh and try again', {position:'top-center'});

      })
};


//==========================================ASYNC PROJECT ACTIONS ===================>

export const getAllProjects = (forceUpdate=false) => (dispatch,getState) => { 
  console.log('getAllProjects was called');
  if (getState().reducers.userInfo) {
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
      toastr.message('App Error', 'We\'re having a hard time reaching the server right now. Please refresh and try again', {position:'top-center'});
      dispatch(clearLoading());
    })
  }
}



export const addProjectAsync = project => (dispatch,getState) => {
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
        dispatch(addProject(response.data))
        dispatch(setProjectRedirect());
      })
      .catch(err => {
        if (err.response.status === 400) {
          return toastr.warning(err.response.data.message);
          }
        toastr.message('App Error', 'We\'re having a hard time reaching the server right now. Please refresh and try again', {position:'top-center'});

      });
}

export const joinProjectAsync = (userId,projectId, successToast, errorToast) => (dispatch, getState) => {
  dispatch(setLoading());
  
  const headers=  {
    'Authorization':`Bearer ${localStorage.getItem('Authtoken') || null}`,
    'Content-Type': 'application/json'
  }

  axios({
    url:`${API_URL}/projects/${projectId}`,
    method:'PUT',
    data: {
      requestType: 'addVolunteer',
      userId
    },
    headers
  })
  .then(response => {
    successToast();
    dispatch(getAllProjects(true));
    dispatch(clearLoading());
  })
  .catch(err => {
    dispatch(clearLoading());
    if (err.response.status === 400) {
    return toastr.warning(err.response.data.message);
    }
    toastr.message('App Error', 'We\'re having a hard time reaching the server right now. Please refresh and try again', {position:'top-center'});

  });
}

export const leaveProjectAsync = (userId,projectId, successToast, errorToast) => (dispatch, getState) => {
  dispatch(setLoading());
  
  const headers=  {
    'Authorization':`Bearer ${localStorage.getItem('Authtoken') || null}`,
    'Content-Type': 'application/json'
  }

  axios({
    url:`${API_URL}/projects/${projectId}`,
    method:'PUT',
    data: {
      requestType: 'removeVolunteer',
      userId
    },
    headers
  })
  .then(response => {
    successToast();
    dispatch(getAllProjects(true));
    dispatch(clearLoading());
  })
  .catch(err => {
    dispatch(clearLoading());
    toastr.message('App Error', 'We\'re having a hard time reaching the server right now. Please refresh and try again', {position:'top-center'});

  });
}



export const deleteProjectAsync = (projectId) => (dispatch, getState) => {
  dispatch(setLoading());
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
    dispatch(clearLoading());
    dispatch(deleteProject(projectId));
  })
  .catch(err => {
    toastr.message('App Error', 'We\'re having a hard time reaching the server right now. Please refresh and try again', {position:'top-center'});

  })

}

//==================================COMMENT ACTIONS=========================>

export const getCommentsAsync = () => (dispatch,getState) => {
    // dispatch(setLoading());
    const fetchOptions = {
        headers: {
        'Authorization':`Bearer ${getState().reducers.authToken || localStorage.getItem('Authtoken') || null}`,
        'Content-Type':'application/json'
      },
    };
    return axios.get(`${API_URL}/comments`, 
        fetchOptions
      )
      .then(comments => {
        dispatch(populateComments(comments.data))
        dispatch(clearLoading());
      })
      .catch(err => {
        toastr.message('App Error', 'We\'re having a hard time reaching the server right now. Please refresh and try again', {position:'top-center'});
        dispatch(clearLoading());
      })
      
}
  

export const addCommentAsync = (userId,projectId, commentBody) => (dispatch, getState) => {

  // dispatch(setLoading());
    const headers =  {
      'Authorization':`Bearer ${getState().reducers.authToken || localStorage.getItem('Authtoken') || null}`,
      'Content-Type':'application/json'
    };



  return axios({
    url:`${API_URL}/comments`,
    headers,
    data: {
      userId,
      projectId,
      commentBody
    },
    method:'POST'
  })
  .then(data => {
    dispatch(getCommentsAsync());
    dispatch(clearLoading());
  })
  .catch(err => {
    toastr.message('App Error', 'We\'re having a hard time reaching the server right now. Please refresh and try again', {position:'top-center'});
    dispatch(clearLoading());
  })

}

export const deleteComment = (commentId) => (dispatch, getState) => {
  // dispatch(setLoading());
  const axiosOptions = {
    url: `${API_URL}/comments/${commentId}`,
    headers: {
      'Authorization':`Bearer ${getState().reducers.authToken || localStorage.getItem('Authtoken') || null}`,
      'Content-Type':'application/json'
    },
    method:'DELETE'
  }
  return axios(axiosOptions)
    .then(() => {
      dispatch(getCommentsAsync());
      dispatch(clearLoading());
    })
    .catch(err => {
      toastr.message('App Error', 'We\'re having a hard time reaching the server right now. Please refresh and try again', {position:'top-center'});
      dispatch(clearLoading());
    })
}





//==================SYNC ACTIONS================================================>

export const POPULATE_COMMENTS = 'POPULATE_COMMENTS';
export const populateComments = comments => ({
  type:POPULATE_COMMENTS,
  comments
})


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
export const setError = (err,errorType) => ({
  type:SET_ERROR,
  err,
  errorType
})

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const registerSuccess = () => ({
  type:REGISTER_SUCCESS
})

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const clearError = () => ({
  type:CLEAR_ERROR
})

export const CLEAR_REDIRECTS = 'CLEAR_REDIRECTS';
export const clearRedirects = () => ({
  type:CLEAR_REDIRECTS
})

export const CONFIRM_DELETE = 'CONFIRM_DELETE';
export const confirmDelete = () => ({
  type:CONFIRM_DELETE
})

export const HIDE_CONFIRM_DELETE = "HIDE_CONFIRM_DELETE";
export const hideConfirmDelete = () => ({
  type:HIDE_CONFIRM_DELETE
})


export const SET_LOADING = 'SET_LOADING';
export const setLoading = () => {
  return {
  type:SET_LOADING
  }
}

export const CLEAR_LOADING = 'CLEAR_LOADING';
export const clearLoading = () => {
  return {
  type:CLEAR_LOADING
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

