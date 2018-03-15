import React from 'react';
import './css/AllUsers.css'
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {fetchUsers, getAllProjects, setLoading} from '../state/actions';


export class AllUsers extends React.Component {

  componentDidMount() {
    this.props.dispatch(setLoading());
    this.props.dispatch(fetchUsers());
    this.props.dispatch(getAllProjects())
  }

  render () {

    console.log(this.props.userProjects);

    return (
      <div className='users-container'> 
        <header>
          <h1> All Users </h1>
        </header>
        <section className='users-section'>
          
          {this.props.users ?  this.props.users.map(user => 
            <div key={user.id}className='user-card'>
              <p className='user-card-name'>{user.fullname}</p>
              <ul className='user-card-skills'>
                <li><b>Skills:</b></li>
                {user.technologies.map((skill,index) => (<li key={index}>{skill}</li>))}
              </ul>
              <p>Merit: {user.merit}</p>
              <ul className='user-card-skills'>
                <li><b>Projects:</b></li>
                {this.props.projects ? this.props.projects.filter(project => Number(project.volunteers.includes(Number(user.id)))).map((project,index) => (<li key={index}><Link to={`/projects/dash/${project.id}`}>{project.title}</Link></li>)) : ''}
                
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
  userInfo: state.reducers.userInfo
  }
}



export default withRouter(connect(mapStateToProps)(AllUsers));