import React from 'react';
import {getAllProjects, setError, clearRedirects, clearError} from '../state/actions';
import {connect} from 'react-redux';
import {withRouter, Redirect, Link} from 'react-router-dom';
import './css/Projects.css';
import store from '../state/store';

export class Projects extends React.Component{

  componentDidMount () {
    this.props.dispatch(clearRedirects());
    this.props.dispatch(clearError())
    if (!store.getState().reducers.authToken) {
      const err = new Error();
      err.message='Not Authenticated, please log in.';
      return this.props.dispatch(setError(err));     
    }
    this.props.dispatch(getAllProjects());
  }

  render() {

    return (
      <div className='project-dashboard-container'>
      {this.props.loggedIn ? '' : <Redirect to='/login' />}
      <h1 className='projects-title'>
            View Available Projects
      </h1>
        {
          this.props.appError ? <div className='app-error-message'>{this.props.appError}</div> : 
        <div>
            <Link to='/projects/new' className='create-new-project-button'>+New Project </Link>
          <div className='projects-container'>
          {this.props.projects && this.props.projects.length ? this.props.projects.map(project => (
          <div data-id={project.id} key={project.id} className='project-card'>
            <h1 className='project-card-title'> {project.title}</h1>
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
  appError:state.reducers.appError,
  loggedIn: state.reducers.authToken ? true : false,
})

export default withRouter(connect(mapStateToProps)(Projects));