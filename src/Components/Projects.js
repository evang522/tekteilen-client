import React from 'react';
import {getAllProjects} from '../state/actions';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import './Projects.css';

export class Projects extends React.Component{

  componentDidMount () {
    if (this.props.projects.length === 0) {
    this.props.dispatch(getAllProjects());
    }
  }


  // onClick(e) {
  //   const projectId = e.target.parentNode.getAttribute("data-id");
  //   this.props.dispatch(setCurrentProject(projectId));
  // }

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
        <div className='projects-container'>
        {projects}
          </div>
        <div className='project-list-container'></div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  projects: state.projects
})

export default withRouter(connect(mapStateToProps)(Projects));