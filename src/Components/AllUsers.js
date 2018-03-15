import React from 'react';
import './css/AllUsers.css'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

export class AllUsers extends React.Component {

  // componentDidMount() {
    
  // }


  render () {
    return (
      <div className='users-container'> 
        <header>
          <h1> All Users </h1>
        </header>
        <section className='users-section'>
          {}
        </section>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  users: state.reducers.users
})


export default withRouter(connect(mapStateToProps)(AllUsers));