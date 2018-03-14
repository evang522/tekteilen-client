import React from 'react';
import {NavLink} from 'react-router-dom';
import './css/Navbar.css';

export default function Navbar(props) {
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
        </ul>
    </nav>
  ) 
}