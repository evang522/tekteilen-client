import React from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import Input from './Input';
// import {required} from '../state/validators';
import {register} from '../state/actions';

export class RegisterForm extends React.Component {

  onSubmit =  values => {
    console.log('onSubmit ran');
    this.props.dispatch(register(values));
  }

  render() {


    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='register-form-container'>
        <h1> Register</h1>
        <Field component={Input} type='text'  name='fullname' label='Name'/>
        <Field component={Input} type='text' name='email' label='Email Address'/>
        <Field component={Input} type='password' name='password' label='Password'/>
        <Field component={Input} type='password' name='password1' label='Verify Password' />
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