import React from 'react';
import {connect} from 'react-redux';
import './css/ProjectDash.css';
import {getAllProjects, deleteProjectAsync, confirmDelete, leaveProjectAsync, joinProjectAsync, fetchUsers} from '../state/actions';
import {withRouter, Redirect, Link} from 'react-router-dom';
import {MembersList} from '../Components/MembersList';
import CommentBoard from './CommentBoard';
import ConfirmDelete from './ConfirmDelete';
import {toastr} from 'react-redux-toastr';

export class ProjectDash extends React.Component {

  componentDidMount() {
    console.log('loggedIn?', this.props.loggedIn);
    this.props.dispatch(getAllProjects());
    this.props.dispatch(fetchUsers());
  }

  onClick() {
    this.props.dispatch(deleteProjectAsync(this.props.project.id));
  }

  joinProject () {
    const toastrSuccess = () => toastr.info(`You have Joined ${this.props.project.title}`);
    const toastrError = () => toastr.warning(`You're already part of this project!`);

    this.props.dispatch(joinProjectAsync(this.props.userInfo.id, this.props.project.id, toastrSuccess, toastrError));
  }
  
  leaveProject () {
    const toastrSuccess = () => toastr.info(`You have left ${this.props.project.title}`);
    const toastrError = () => toastr.warning(`You can't leave a project you're not part of!`);

    if (this.props.project.volunteers) {
     if (!this.props.project.volunteers.includes(this.props.userInfo.id)) {
        return toastrError();
     }
  }
    this.props.dispatch(leaveProjectAsync(this.props.userInfo.id, this.props.project.id, toastrSuccess, toastrError));
    this.props.dispatch(getAllProjects());    
  }

  showDeleteProject () {
    this.props.dispatch(confirmDelete());
  }

  render() {
      let output = null;
      if (this.props.project) {
        output = (
          <section className='project-dashboard'>
            {this.props.loggedIn ? '' : <Redirect to='/projects' />}
            {this.props.redirectToProject ? <Redirect to='/projects' /> : ''} 
            <h1 className='project-dash-header'>{this.props.project.title}</h1>
            <div className='divider'></div>
            <br/>
            <br/>
            <div className='project-dash-info-container'>
              <div className='project-description'>
                <div className='project-description-label'>Description:
                </div>
                <br/>
                <div className='project-description-text'>
                 {this.props.project.description}
                 </div>
              </div>
              <br/>
              <br/>
              <div className='project-technologies-list'>
              <div className='project-description-label'>
              Technologies: 
              </div>
                <br/>
                <div className='technology-list-container'>
                {this.props.project.technologies.map((technology,index) => {
                  return <div key={index}className='tech-name'>{technology}</div>
                })}
                </div>
              </div>
              <div className='project-dash-button-container'>
                <Link to='/projects' className='join-project-button project-dash-button' >Back</Link>
                {this.props.userInfo.isadmin ? <button className='project-dash-button delete-project-button' to='/projects' onClick={() => this.showDeleteProject()}>Remove</button> : ''}
                <button className='project-dash-button join-project-button' onClick={() => this.joinProject()}>Join Project </button>
                <button className='project-dash-button leave-project-button' onClick={() => this.leaveProject()}>Leave Project </button>
              </div>
            </div>
            <MembersList project={this.props.project} users={this.props.users}/>
            <CommentBoard project={this.props.project} />
            {this.props.showConfirmDelete ? <ConfirmDelete currentProject = {this.props.project.id}/> : '' }
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
      loggedIn: state.reducers.authToken===null ? false: true,
      users:state.reducers.users,
      appError: state.reducers.appError,
      showConfirmDelete:state.reducers.showConfirmDelete,
      redirectToProject:state.reducers.redirectToProjects
    }
  };

  export default withRouter(connect(mapStateToProps)(ProjectDash));
