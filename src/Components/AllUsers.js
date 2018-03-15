import React from 'react';
import './css/AllUsers.css'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {fetchUsers, setLoading} from '../state/actions';


export class AllUsers extends React.Component {

  componentDidMount() {
    this.props.dispatch(setLoading());
    this.props.dispatch(fetchUsers());
  }
  

  render () {
    console.log(this.props.users)
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
              
            </div>
          ) : 'Error Loading Users. Please try again later'}
        </section>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  users: state.reducers.users
})


export default withRouter(connect(mapStateToProps)(AllUsers));