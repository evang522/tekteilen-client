import React from 'react';
import {connect} from 'react-redux';
import './css/ProjectDash.css';
import {getAllProjects, deleteProjectAsync, leaveProjectAsync, joinProjectAsync, fetchUsers} from '../state/actions';
import {withRouter, Redirect, Link} from 'react-router-dom';
import {MembersList} from '../Components/MembersList';
import CommentBoard from './CommentBoard';

export class ProjectDash extends React.Component {

  componentDidMount() {
    this.props.dispatch(getAllProjects());
    this.props.dispatch(fetchUsers());
  }

  onClick() {
    this.props.dispatch(deleteProjectAsync(this.props.project.id));
  }

  joinProject () {
    this.props.dispatch(joinProjectAsync(this.props.userInfo.id, this.props.project.id));
  }
  
  leaveProject () {
    this.props.dispatch(leaveProjectAsync(this.props.userInfo.id, this.props.project.id));
    this.props.dispatch(getAllProjects());    
  }

  render() {
      let output = null;
      if (this.props.project) {
        output = (
          <section className='project-dashboard'>
            {this.props.loggedIn ? '' : <Redirect to='/login' />}
            {this.props.redirectToProject ? <Redirect to='/projects' /> : ''} 
            <h1 className='project-dash-header'>{this.props.project.title}</h1>
            <div className='divider'></div>
            <br/>
            <br/>
            <div className='project-dash-info-container'>
              <p className='project-description'>
                <div className='project-description-label'>Description:
                </div>
                <br/>
                <div className='project-description-text'>
                 {this.props.project.description}
                 </div>
              </p>
              <br/>
              <br/>
              <p className='proejct-technologies-list'>
              <div className='project-description-label'>
              Technologies: 
              </div>
                <br/>
                {this.props.project.technologies}
              </p>
              {this.props.appError.userError ? <div className='user-error-dialogue'>{this.props.appError.userError.response.data.message}</div> : ''}
              <div className='project-dash-button-container'>
              {this.props.userInfo.isadmin ? <Link className='delete-project-button' to='/projects' onClick={() => this.onClick()}>Delete Project </Link> : ''}
              <button className='join-project-button' onClick={() => this.joinProject()}>Join Project </button>
              <button className='leave-project-button' onClick={() => this.leaveProject()}>Leave Project </button>
              </div>
            </div>
            <MembersList project={this.props.project} users={this.props.users}/>
            <CommentBoard project={this.props.project} />
          </section>
        )
      }
      return (
        output
      )
    }
  }

  const mapStateToProps = (state, props) => {
    return {
    project: state
      .reducers
      .projects
      .find(project => project.id === Number(props.match.params.id)),
      userInfo: state.reducers.userInfo,
      loggedIn: state.reducers.authToken ? true : false,
      users:state.reducers.users,
      appError: state.reducers.appError
    }
  };

  export default withRouter(connect(mapStateToProps)(ProjectDash));
