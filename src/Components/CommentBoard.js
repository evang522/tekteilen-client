import React from 'react';
import {connect} from 'react-redux';
import {clearError, addCommentAsync, getCommentsAsync} from '../state/actions';
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
  
  render () {
    
    console.log('comments', this.props.comments);

    return (
      <div className='comment-board'>
        <section className='comment-board-label'>
          Discussion
        </section>
        {this.props.comments ? this.props.comments.filter(comment => {
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
              {/* <div className='comment-delete-link'>
                delete
              </div> */}
            </div>
          )
        }) : ''}
        <div className='add-comment-container'>
         <form onSubmit={this.props.handleSubmit(this.addComment)}className='add-comment-form'>
           <Field className='comment-input' name='commentBody' cols='50' component='textarea'/>
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