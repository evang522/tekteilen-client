import React from 'react';
import {connect} from 'react-redux';
import {clearError, addCommentAsync, deleteComment, getCommentsAsync} from '../state/actions';
import {reduxForm, Field} from 'redux-form';
import './css/CommentBoard.css';
import Moment from 'react-moment';
import io from 'socket.io-client';
import {SOCKET_URL} from '../config';

export class CommentBoard extends React.Component {

  constructor (props) {
    super(props);

    // Socketio Code for populating chat messages live
    this.socket = io.connect(SOCKET_URL);

    this.socket.on(`chat-project-${this.props.project? this.props.project.id : ''}`, data => {
      this.props.dispatch(getCommentsAsync());
    })

  }


  componentDidMount () {
    this.props.dispatch(clearError())
    this.props.dispatch(getCommentsAsync());
  }

  addComment = values => {

    if (!values.commentBody) {
      return;
    }
    this.props.dispatch(addCommentAsync(this.props.userInfo.id, this.props.project.id, values.commentBody))
    values.commentBody = '';

    
    this.socket.emit('new-chat-message', {
      projectId:this.props.project.id
    })

    this.socket.on(`chat-project-${this.props.project.id}`, data => {
      this.props.dispatch(getCommentsAsync());
    })
  }
  
  deleteComment = (id)  => {
    this.props.dispatch(deleteComment(id))
    this.socket.emit('new-chat-message', {
      projectId:this.props.project.id
    })
  }


  handleKeyDown = function (e, cb) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      cb();
    }
  };


  render () {


    const projectComments = this.props.comments ? this.props.comments.filter(comment => {
      return comment.project_id === this.props.project.id;
    })
    .map(comment => {
      return (
        <div key={comment.id} className='comment'>
          <div className='comment-author'>
            {comment.author + ':'}
          </div>
          <div className='comment-body'>
            {comment.message}
            <Moment className='moment-format' fromNow ago>{comment.date}</Moment>
            
          </div>
          {comment.user_id === this.props.userInfo.id ? 
            <div onClick={() => this.deleteComment(comment.id)} className='comment-delete-link'>
            delete
          </div> : '' } 
        
        </div>
      )
    }) : '';


    const comments = projectComments.length > 0 ? projectComments : (<div className='no-comments-message'>No discussion here yet!</div>);

    return (
      <div className='comment-board-container'>
        <div className='comment-board'>
          <div className='comment-board-header'>
            Discussion Board
            </div>
          {comments}
        </div>
          <div className='add-comment-container'>
          <form onKeyDown={e => this.handleKeyDown(e,this.props.handleSubmit(this.addComment))} onSubmit={this.props.handleSubmit(this.addComment)}className='add-comment-form'>
            <Field className='comment-input' id='comment-input' name='commentBody' component='textarea'/>
            <label htmlFor='comment-input'>
              <button type='submit' className='add-comment-button'>
                Add Comment
              </button>
            </label>
            </form>
          </div>
      </div>
    )
  }
}

CommentBoard = reduxForm({
  form: 'commentForm'
})(CommentBoard);


const mapStateToProps = state => ({
  comments: state.reducers.comments,
  userInfo: state.reducers.userInfo
});

export default connect(mapStateToProps)(CommentBoard);