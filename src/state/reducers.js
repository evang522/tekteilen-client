import {SET_LOADING, CONFIRM_DELETE, HIDE_CONFIRM_DELETE, POPULATE_COMMENTS, DELETE_PROJECT, CLEAR_LOADING, HIDELOGOUT_DIALOGUE, CLEAR_REDIRECTS, SET_PROJECT_REDIRECT, LOGOUT, SET_TOKEN, POPULATE_PROJECTS, SET_ERROR, CLEAR_ERROR, POPULATE_USERS, ADD_PROJECT, SHOWLOGOUT_DIALOGUE, REGISTER_SUCCESS} from './actions';

const initialState = {
  loading: false,
  projects: [],
  appError:{},
  authToken: localStorage.getItem('Authtoken') || null,
  userInfo: localStorage.getItem('Authtoken') ? JSON.parse(atob(localStorage.getItem('Authtoken').split('.')[1])) : null,
  users: [],
  showLogoutDialogue:false,
  comments: [],
  showConfirmDelete:false,
  redirectToProjects:false,
}

export const reducers = (state = initialState, action) => {
  if (action.type === SET_LOADING) {
    return Object.assign({}, state, {loading: true})
  }
  if (action.type === CLEAR_LOADING) {
    return Object.assign({}, state, {loading: false})
  }
  if (action.type === POPULATE_PROJECTS) {
    return Object.assign({}, state, {
      projects: action.projects,
      loading: false
    })
  }
  if (action.type === SET_ERROR) {
    if (action.errorType === 'SERVER') {
      return Object.assign({}, state, {appError: Object.assign({},state.appError, {serverError:action.err}), loading:false})
    }
    if (action.errorType === 'USER') {
      const returnValue= Object.assign({}, state, {appError: Object.assign({},state.appError, {userError:action.err}), loading:false})
      return returnValue;
    }
  }
  if (action.type===CONFIRM_DELETE) {
    return Object.assign({}, state, {showConfirmDelete:true});
  }
  if (action.type===HIDE_CONFIRM_DELETE) {
    return Object.assign({}, state, {showConfirmDelete:false});
  }
  if (action.type===POPULATE_COMMENTS) {
    return Object.assign({},state, {comments: action.comments})
  }
  if (action.type === CLEAR_ERROR) {
    return Object.assign({}, state, {appError: {}})
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
  if(action.type===REGISTER_SUCCESS) {
    return Object.assign({},state, {registerSuccess:true});
  }
  if (action.type === SHOWLOGOUT_DIALOGUE) {
    return Object.assign({},state, {showLogoutDialogue:true})
  }
  if (action.type === HIDELOGOUT_DIALOGUE) {
    return Object.assign({},state, {showLogoutDialogue:false})
  }

  return state;
}