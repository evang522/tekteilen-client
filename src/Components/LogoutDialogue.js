import React from 'react';
import './css/LogoutDialogue.css';
import {logoutAsync, hideLogoutDialogue} from '../state/actions';
import {connect} from 'react-redux';
import {toastr} from 'react-redux-toastr';
export class LogoutDialogue extends React.Component {

  

  linkOnClick() {
    const toastrSuccess = () => toastr.info('You\'ve been logged out');
    this.props.dispatch(logoutAsync(toastrSuccess))
    
  }

  hideDialogue () {
    this.props.dispatch(hideLogoutDialogue());
  }

  render() {


    return(
      <div className='pagemask-container'>
        <div className='page-mask'></div>
        <div className='dialogue-container'>
          <section>
            <h2> <b> Log out</b> </h2>
            <br/>
            <p> Are you sure you want to log out? </p> 
            <div className='button-container'>
              <button onClick={() => this.linkOnClick()}className='log-out-confirm-button'><b>Log Out</b></button>
              <button onClick={() => this.hideDialogue()}className='log-out-confirm-button'><b>Back</b></button>
            </div>
          </section>
        </div>
      </div>
    )
  }
}


export default connect()(LogoutDialogue);