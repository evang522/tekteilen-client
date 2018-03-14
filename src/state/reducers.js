import {SET_LOADING, POPULATE_PROJECTS} from './actions';

const initialState = {
  loading: false,
  projects: [],
  currentProject: null
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
  return state;
}