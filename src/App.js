import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Projects from './Components/Projects';
import {Route} from 'react-router-dom';
import AllUsers from './Components/AllUsers';
import Loader from './Components/Loader';
import {connect} from 'react-redux';
import {withRouter, Switch} from 'react-router-dom';
import ProjectDash from './Components/ProjectDash';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Homepage from './Components/Homepage';
import ProjectSubmit from './Components/ProjectSubmit';
import LogoutDialogue from './Components/LogoutDialogue';
import RegisterForm from './Components/RegisterForm';
import {clearError} from './state/actions';

export class App extends Component {


  componentDidMount () {
    this.props.dispatch(clearError());
  }


  render() {
    return (
      <div>
  {this.props.serverError ? 
        <div>
        <Navbar /> 
        <div className='app-error-message'>{this.props.serverError.message}</div></div> : 
      
      <div className="App">

        <Navbar />
        {this.props.showLogoutDialogue ? <LogoutDialogue/> : ''}
        <Route exact path='/register' component={RegisterForm} />
        <Route exact path='/' component={Homepage} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/add/project' component={ProjectSubmit} />  
        <Switch>
          <Route exact path='/projects/:id' component={ProjectDash} />    
          <Route exact path='/projects' component={Projects} />  
        </Switch>
        {this.props.loading ? <Loader /> : ''} 
        <Route path='/users' component={AllUsers} />        
    </div> }
    </div>
    );
  }
}

const mapStateToProps = state => ({
  loading:state.reducers.loading,
  showLogoutDialogue:state.reducers.showLogoutDialogue,
  serverError:state.reducers.appError? state.reducers.appError.serverError : null,
})

export default withRouter(connect(mapStateToProps)(App));


