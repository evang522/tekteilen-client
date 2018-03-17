import React from 'react';
import './css/LogoutDialogue.css';
import {logoutAsync, hideLogoutDialogue} from '../state/actions';
import {connect} from 'react-redux';
export class LogoutDialogue extends React.Component {


  linkOnClick() {
    this.props.dispatch(logoutAsync())
  }

  hideDialogue () {
    this.props.dispatch(hideLogoutDialogue());
  }

  render() {


    return(
      <div className='pagemask-container'>
        <div className='page-mask'></div>
        <div className='login-dialogue-container'>
          <section>
            <h2> Log out </h2>
            <br/>
            <p> Are you sure you want to log out? </p> 
            <button onClick={() => this.linkOnClick()}className='log-out-confirm-button'>Log Out</button>
            <button onClick={() => this.hideDialogue()}className='log-out-confirm-button'>Back</button>
          </section>
        </div>
      </div>
    )
  }
}


export default connect()(LogoutDialogue);