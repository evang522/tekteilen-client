import React from 'react';
import {connect} from 'react-redux';
import './css/Login.css';
import {Field, reduxForm} from 'redux-form';
import {required} from '../state/validators';
import Input from '../Components/Input';
import {login} from '../state/actions';
import {Redirect} from 'react-router-dom';


export class Login extends React.Component {

  onSubmit = values => {
    this.props.dispatch(login(values));
  }

  render() {



    return (
      <div className='login-page-container'>
        {this.props.loggedIn ? (<Redirect to='/' />) : ''}
        <header className='login-page-header'>
          <h1> Login to Tekteilen</h1>
        </header>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}className='login-form' >
            <Field label='Email Address' validate={required} name='email' component={Input} type='text' />
            <Field label='Password' validate={required} name='password' component={Input} type='password' />
          <button className='login-submit-button' type='submit'>Submit</button>
        </form>
      </div>
    )

  }

}



const mapStateToProps = state => ({
  loggedIn: state.reducers.authToken ? true : false
})

Login = reduxForm({
  form:'loginform'
})(Login)

export default connect(mapStateToProps)(Login);