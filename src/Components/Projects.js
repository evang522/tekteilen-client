import React from 'react';
import {getAllProjects, clearError} from '../state/actions';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import './css/Projects.css';

export class Projects extends React.Component{

  componentDidMount () {
    this.props.dispatch(clearError())
    if (this.props.projects.length === 0) {
    this.props.dispatch(getAllProjects());
    }
  }

  render() {
  const projects = this.props.projects.map(project => (
    <div data-id={project.id} key={project.id} className='project-card'>
      <h1 className='project-card-title'> Title: {project.title}</h1>
      <p className='project-card-description'> Description: {project.description}</p>
      <p className='project-card-organization'> Organization:{project.organization}</p> 
      <Link className='project-card-button' to={'/projects/dash/' + project.id}>More Details</Link>
    </div>
  ))
    

    return (
      <div className='project-dashboard-container'>
      <h1 className='projects-title'>
            View Available Projects
      </h1>
        {this.props.appError ? <div className='app-error-message'>{this.props.appError}</div> : 
        <div>

          <div className='projects-container'>
          {projects}
            </div>
          <div className='project-list-container'></div>
        </div>
        }

      </div>
    )
  }
}

const mapStateToProps = state => ({
  projects: state.reducers.projects,
  appError:state.reducers.appError
})

export default withRouter(connect(mapStateToProps)(Projects));