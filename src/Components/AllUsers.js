import React from 'react';
import './css/AllUsers.css'
import {connect} from 'react-redux';
import {withRouter, Redirect, Link} from 'react-router-dom';
import {fetchUsers, clearError, getAllProjects} from '../state/actions';


export class AllUsers extends React.Component {

  componentDidMount() {
    if (this.props.loggedIn) {
    this.props.dispatch(clearError());
    this.props.dispatch(fetchUsers());
    this.props.dispatch(getAllProjects())
    }
  }

  render () {

const userProjects = (user) =>  {
  if (this.props.projects) {
    const projectsInvolvingUser =
     this
      .props
      .projects
      .filter(project => {
        if (project.volunteers) {
          return Number(project.volunteers.includes(Number(user.id)))
        }
        return false;
      });

      if (projectsInvolvingUser.length === 0) {

        return <div className='projects-breadcrumbs extended-breadcrumb'>Looks like this user isn't involved in any projects yet!</div>
      }
      
      return projectsInvolvingUser.map((project, index) => (
        <li className='projects-breadcrumbs' key={index}>
          <Link to={`/projects/${project.id}`}>{project.title}</Link>
        </li>
      ))
    }
}

console.log(userProjects);

    return (
      <div className='users-container'>
      {this.props.loggedIn ? '' : <Redirect to='/login' />}
        <header>
          <h1> All Users </h1>
        </header>
        <section className='users-section'>
          
          {this.props.users ?  this.props.users.map(user => 
            <div key={user.id}className='user-card'>
              <p className='user-card-name'>{user.fullname}</p>
              <ul className='user-card-skills'>
                {user.technologies ? user.technologies.map((skill,index) => (<li className='user-technology-breadcrumb' key={index}>{skill}</li>)) : ''}
              </ul>
              <p className='merit'>Merit: {user.merit}</p>
              <ul className='user-card-skills'>
                <li><b>Projects:</b></li>
              {userProjects(user)}
              </ul>
              
            </div>
          ) : 'Error Loading Users. Please try again later'}
        </section>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
   users: state.reducers.users,
  //  userProjects: state.reducers.projects.filter(project => project.volunteers.includes(Number(state.reducers.userInfo.id))) 
  projects: state.reducers.projects,
  userInfo: state.reducers.userInfo,
  loggedIn: state.reducers.authToken ? true : false,
  }
}



export default withRouter(connect(mapStateToProps)(AllUsers));