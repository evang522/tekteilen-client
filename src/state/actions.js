import {API_URL} from '../config';

export const getAllProjects = (forceUpdate=false) => (dispatch,getState) => { 
  const {projects} = getState();
  if (!forceUpdate && projects.length) { 
    return;
  }
  dispatch(setLoading());
  return fetch(`${API_URL}/projects`)
    .then(response => response.json())
    .then(projects => dispatch(populateProjects(projects)))
    .catch(err => {
      console.log(err);
    })
}



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