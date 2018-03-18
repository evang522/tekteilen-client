import React from 'react';
import {connect} from 'react-redux';
import './css/Dashboard.css';
import {Redirect, withRouter, Link} from 'react-router-dom';
import {getAllProjects} from '../state/actions';

export class Dashboard extends React.Component {

  componentDidMount() {
    if (this.props.projects.length < 1) {
      return this.props.dispatch(getAllProjects());
    }
  }

  render() {
   
   return (
      <div className='user-dash-container'>
        {this.props.loggedIn ? '' : <Redirect to='/login' />}
        <header className='user-dash-header-container'>
          <h1 className='user-dash-header'>Dashboard</h1>
        </header>
        <section className='subscribed-projects'>
          <h2>Welcome, {this.props.userInfo ? this.props.userInfo.fullname.split(' ')[0] : ''}!</h2>
          <h3> Projects You're Part of: </h3>
          <div className='project-dashboard-container'>
        {
          this.props.appError ? <div className='app-error-message'>{this.props.appError.serverError}</div> : 
        <div>

          <div className='projects-container'>
          {this.props.projects.length ? this.props.projects.map(project => (
          <div data-id={project.id} key={project.id} className='project-card'>
            <h1 className='project-card-title'> Title: {project.title}</h1>
            <p className='project-card-description'> Description: {project.description}</p>
            <p className='project-card-organization'> Organization:{project.organization}</p> 
            <Link className='project-card-button' to={'/projects/' + project.id}>Open Project</Link>
          </div>)) : '' }

            </div>
          <div className='project-list-container'></div>
        </div>
        }

      </div>
        </section>
      </div>
    )


  }


}


const mapStateToProps = state => {
  return {
  loggedIn: state.reducers.authToken ? true : false,
  userInfo: state.reducers.userInfo,
  projects: state.reducers.projects.filter(project => {
    if (project.volunteers) {
    return project.volunteers.includes(state.reducers.userInfo.id)
    }
    return false;
  })

  }
}
export default withRouter(connect(mapStateToProps)(Dashboard));