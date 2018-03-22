import React from 'react';
import {connect} from 'react-redux';
import { hideConfirmDelete, deleteProjectAsync, setProjectRedirect } from '../state/actions';
import {toastr} from 'react-redux-toastr';

export class ConfirmDelete extends React.Component {

  hideDialogue = () => {
    this.props.dispatch(hideConfirmDelete());
  } 
  

  onClick(e) {
    this.props.dispatch(deleteProjectAsync(this.props.currentProject));
    this.props.dispatch(setProjectRedirect());
    this.props.dispatch(hideConfirmDelete());
    toastr.info('Project Removed');
  }
  
  render() {
    return (
      <div className='confirm-delete-container'>
      <div className='page-mask'></div>
        <div className='dialogue-container'>
          <section>
            <h2> <b> Remove Project</b> </h2>
            <br/>
            <p> Are you sure you want to remove this project from TekTeilen? </p> 
            <button onClick={(e) => this.onClick(e)} className='confirm-button'><b>Remove</b></button>
            <button onClick={() => this.hideDialogue()}className='confirm-button'><b>Back</b></button>
          </section>
        </div>
      </div>
    )
  }

}


export default connect()(ConfirmDelete);