import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../Components/Input';
import {connect} from 'react-redux';
import {required} from '../state/validators';
import {addProjectAsync, getAllProjects, setProjectRedirect} from '../state/actions';
import {Redirect} from 'react-router-dom';
import './css/ProjectSubmit.css';

export class ProjectSubmit extends React.Component {

  
  componentDidMount() {
    console.log('visited project submit');
    if (this.props.projects.length < 1) {
      return this.props.dispatch(getAllProjects());
    }
  }

  onClick = values => {
    console.log(values);
    this.props.dispatch(addProjectAsync(values))
    this.props.dispatch(setProjectRedirect());
  }

  render() {

    return (
      <div className='project-submit-form-container'>
      {this.props.redirectToProjects ? <Redirect to='/projects' /> : '' }
        <section className='title'>
          <h1>Submit a Project Request</h1>
        </section>
        <form onClick={this.props.handleSubmit(this.onClick)}className='project-submit-form'>
          <Field component={Input} validate={required} type='text' name='title' label='Project Title'/>
          <Field element='textarea' component={Input} validate={required} type='text' name='description' label='Project Description' />
          <Field component={Input} validate={required} type='text' name='technologies' label='Technologies Needed (Comma Separated Values)' />
          <Field component={Input}  validate={required} type='text' name='organization' label='Organization' />
          <button className='submit-project-button' type='submit'>Submit</button>
        </form>
      </div>

    )


  }
}



const mapStateToProps = state => ({
  projects:state.reducers.projects,
  redirectToProjects:state.reducers.redirectToProjects
  
})

ProjectSubmit = reduxForm({
  form: 'projectSubmit'
})(ProjectSubmit)

export default connect(mapStateToProps)(ProjectSubmit);