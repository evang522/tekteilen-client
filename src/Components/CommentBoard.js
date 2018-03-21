import React from 'react';
import {connect} from 'react-redux';
import {clearError, addCommentAsync, deleteComment, getCommentsAsync} from '../state/actions';
import {reduxForm, Field} from 'redux-form';
import './css/CommentBoard.css';
import Moment from 'react-moment';

export class CommentBoard extends React.Component {



  componentDidMount () {
    this.props.dispatch(clearError())
    this.props.dispatch(getCommentsAsync());
  }

  addComment = values => {
    if (!values.commentBody) {
      return;
    }
    this.props.dispatch(addCommentAsync(this.props.userInfo.id, this.props.project.id, values.commentBody))
    console.log(values);
    values.commentBody = '';
  }
  
  deleteComment = (id)  => {
    let commentId = id;
    this.props.dispatch(deleteComment(id))
    console.log(commentId);
  }


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
            <Moment className='moment-format' format="MMMM Do YYYY, h:mm a">{comment.date}</Moment>
            
          </div>
          <div onClick={() => this.deleteComment(comment.id)} className='comment-delete-link'>
            delete
          </div>
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
          <form onSubmit={this.props.handleSubmit(this.addComment)}className='add-comment-form'>
            <Field className='comment-input' name='commentBody' component='textarea'/>
            <button type='submit' className='add-comment-button'>
            Add Comment
          </button>
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