import {SET_LOADING, DELETE_PROJECT, HIDELOGOUT_DIALOGUE, CLEAR_REDIRECTS, SET_PROJECT_REDIRECT, LOGOUT, SET_TOKEN, POPULATE_PROJECTS, SET_ERROR, CLEAR_ERROR, POPULATE_USERS, ADD_PROJECT, SHOWLOGOUT_DIALOGUE} from './actions';

const initialState = {
  loading: false,
  projects: [],
  appError:null,
  authToken: localStorage.getItem('Authtoken') || null,
  userInfo: localStorage.getItem('Authtoken') ? JSON.parse(atob(localStorage.getItem('Authtoken').split('.')[1])) : null,
  users: [],
  showLogoutDialogue:false
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
  if (action.type === SET_PROJECT_REDIRECT) {
    return Object.assign({}, state, {redirectToProjects: true})
  }
  if (action.type === CLEAR_REDIRECTS) {
    return Object.assign({}, state, {redirectToProjects: false})
  }
  if (action.type === ADD_PROJECT) {
    return Object.assign({}, state, {projects: [...state.projects, action.project[0]]})
  }
  if (action.type === DELETE_PROJECT) {
    return Object.assign({}, state, {projects:
    state.projects
      .filter(project => project.id !== action.projectId)
    })
  }
  if (action.type === SHOWLOGOUT_DIALOGUE) {
    return Object.assign({},state, {showLogoutDialogue:true})
  }
  if (action.type === HIDELOGOUT_DIALOGUE) {
    return Object.assign({},state, {showLogoutDialogue:false})
  }

  return state;
}