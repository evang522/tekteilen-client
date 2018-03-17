import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {showLogoutDialogue} from '../state/actions'
import './css/Navbar.css';

export class Navbar extends React.Component {


  onClick () {
    if (this.props.loggedIn) {
    this.props.dispatch(showLogoutDialogue())
    }
  }

  render() {

  return (
      <nav className='navbar'>
        <ul className='nav-ul'>
          <li className='nav-li'>
            <NavLink activeClassName='active-link' to='/'>
              TekTeilen
            </NavLink>
          </li>
          <li className='nav-li'>
            <NavLink activeClassName='active-link' to='/dashboard'>
              Dashboard
            </NavLink>
          </li>
          <li className='nav-li'>
            <NavLink activeClassName='active-link' to='/projects'>
              Projects
            </NavLink>
          </li>
          <li className='nav-li'>
            <NavLink activeClassName='active-link' to='/users'>
              Users
            </NavLink>
          </li>
          {this.props.loggedIn ? 
           ( <li className='nav-li'>
            <a className='logout-button' onClick={e => this.onClick()} >
              Logout
            </a>
          </li>) : 
          ( <li className='nav-li'>
          <NavLink activeClassName='active-link' to='/login'>
              Login
            </NavLink>
          </li>)
          }

        </ul>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.reducers.authToken ? true : false
})

export default withRouter(connect(mapStateToProps)(Navbar));