import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutAsync} from '../state/actions'
import './css/Navbar.css';
import store from '../state/store';

export class Navbar extends React.Component {



  linkOnClick() {
    console.log('click was called');
    this.props.dispatch(logoutAsync())
  }

  render() {
    console.log('props', this.props);

  return (
      <nav className='navbar'>
        <ul className='nav-ul'>
          <li className='nav-li'>
            <NavLink activeClassName='active-link' to='/'>
              Home
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
            <a className='logout-button' onClick={e => this.linkOnClick()} >
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