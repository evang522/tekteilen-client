import React from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import Input from './Input';
// import {required} from '../state/validators';
import {register} from '../state/actions';
import './css/RegisterForm.css';

export class RegisterForm extends React.Component {

  onSubmit =  values => {
    this.props.dispatch(register(values));
  }

  render() {


    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='register-form-container'>
        <h1 className='register-header'> Create a New Account</h1>
        <Field component={Input} linebreak className='register-input' type='text'  name='fullname' label='Name'/>
        <Field component={Input} linebreak className='register-input' type='text' name='email' label='Email Address'/>
        <Field component={Input} linebreak className='register-input' type='password' name='password' label='Password'/>
        <Field component={Input} linebreak className='register-input' type='password' name='password1' label='Verify Password' />
        <Field component={Input} linebreak className='register-input' type='text' name='technologies' label='Technologies you are Skilled With (Comma Separated)' />
        <button  type='submit'>Submit</button>
      </form>      
    )

  }
}



RegisterForm = reduxForm({
  form:'registerForm'
})(RegisterForm);


// const mapStateToProps

export default connect()(RegisterForm);