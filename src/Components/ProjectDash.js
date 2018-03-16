import React from 'react';
import {connect} from 'react-redux';
import './css/ProjectDash.css';
import {getAllProjects, deleteProjectAsync} from '../state/actions';
import {withRouter, Redirect, Link} from 'react-router-dom';

export class ProjectDash extends React.Component {

  componentDidMount() {
    this.props.dispatch(getAllProjects());
  }

  onClick() {
    this.props.dispatch(deleteProjectAsync(this.props.project.id));
  }

  render() {
    if (this.props.project) {
      return (
        <section className='project-dashboard'>
          {this.props.loggedIn ? '' : <Redirect to='/login' />}
          {this.props.redirectToProject ? <Redirect to='/projects' /> : ''} 
          <h1 className='project-dash-header'>{this.props.project.title}</h1>
          <br/>
          <br/>
          <p className='white-text'>Description: {this.props.project.description}</p>
          <br/>
          <br/>
          <p className='white-text'>Technologies: {this.props.project.technologies}</p>
          {this.props.userInfo.isadmin ? <Link className='delete-project-button' to='/projects' onClick={() => this.onClick()}>Delete Project </Link> : ''}
        </section>
      )
    } else {
      return (

     <Redirect to='/projects' />
      
    )
    }
  }
}

  const mapStateToProps = (state, props) => ({
    project: state
      .reducers
      .projects
      .find(project => project.id === Number(props.match.params.id)),
      userInfo: state.reducers.userInfo,
      loggedIn: state.reducers.authToken ? true : false,
  })

  export default withRouter(connect(mapStateToProps)(ProjectDash));
