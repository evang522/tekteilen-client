import {SET_LOADING, LOGOUT, SET_TOKEN, POPULATE_PROJECTS, SET_ERROR, CLEAR_ERROR, POPULATE_USERS} from './actions';

const initialState = {
  loading: false,
  projects: [],
  appError:null,
  authToken: localStorage.getItem('Authtoken') || null,
  userInfo: localStorage.getItem('Authtoken') ? JSON.parse(atob(localStorage.getItem('Authtoken').split('.')[1])) : null,
  users: []
}

export const reducers = (state = initialState, action) => {
  if (action.type === SET_LOADING) {
    return Object.assign({}, state, {loading: true})
  }
  if (action.type === POPULATE_PROJECTS) {
    return Object.assign({}, state, {
      projects: action.projects,
      loading: false
    })
  }
  if (action.type === SET_ERROR) {
    return Object.assign({}, state, {appError: action.err.message, loading:false})
  }
  if (action.type === CLEAR_ERROR) {
    return Object.assign({}, state, {appError: null})
  }
  if (action.type === SET_TOKEN) {
    return Object.assign({}, state, {authToken: action.token, userInfo: JSON.parse(atob(action.token.split('.')[1]))})
  }
  if (action.type === LOGOUT) {
    return Object.assign({},state, {authToken:null, projects:[]});
  }
  if (action.type === POPULATE_USERS) {
    return Object.assign({}, state, {users:action.users});
  }
  return state;
}