import React from 'react';
import {connect} from 'react-redux';
import './css/Dashboard.css';
import {Redirect, withRouter, Link} from 'react-router-dom';
import {getAllProjects} from '../state/actions';

export class Dashboard extends React.Component {

  componentDidMount() {
    if (!this.props.projects.length) {
      return this.props.dispatch(getAllProjects());
    }
  }

  render() {
   
   return (
      <div className='user-dash-conatainer'>
        {this.props.loggedIn ? '' : <Redirect to='/login' />}
        <header className='user-dash-header-container'>
          <h1 className='user-dash-header'>Dashboard</h1>
        </header>
        <section className='subscribed-projects'>
          <h3> Projects You're Part of: </h3>
          <div className='project-dashboard-container'>
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
        </section>
      </div>
    )


  }


}


const mapStateToProps = state => ({
  loggedIn: state.reducers.authToken ? true : false,
  userInfo: state.reducers.userInfo,
  projects: state.reducers.projects.filter(project => project.volunteers.includes(state.reducers.userInfo.id))

})

export default withRouter(connect(mapStateToProps)(Dashboard));