import React from 'react';
import {getAllProjects, setError, clearError} from '../state/actions';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import './css/Projects.css';
import store from '../state/store';

export class Projects extends React.Component{

  componentDidMount () {
    this.props.dispatch(clearError())
    if (!store.getState().reducers.authToken) {
      console.log('error')
      const err = new Error();
      err.message='Not Authenticated, please log in.';
      return this.props.dispatch(setError(err));     
    }
    this.props.dispatch(getAllProjects());

  }

  render() {


    
    console.log('projects in state', this.props.projects);

    return (
      <div className='project-dashboard-container'>
      <h1 className='projects-title'>
            View Available Projects
      </h1>
        {
          this.props.appError ? <div className='app-error-message'>{this.props.appError}</div> : 
        <div>

          <div className='projects-container'>
          {this.props.projects.length ? this.props.projects.map(project => (
          <div data-id={project.id} key={project.id} className='project-card'>
            <h1 className='project-card-title'> Title: {project.title}</h1>
            <p className='project-card-description'> Description: {project.description}</p>
            <p className='project-card-organization'> Organization:{project.organization}</p> 
            <Link className='project-card-button' to={'/projects/dash/' + project.id}>More Details</Link>
          </div>)) : '' }

            </div>
          <div className='project-list-container'></div>
        </div>
        }

      </div>
    )
  }
}

const mapStateToProps = state => ({
  projects: state.reducers.projects || [],
  appError:state.reducers.appError
})

export default withRouter(connect(mapStateToProps)(Projects));