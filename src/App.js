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

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        {this.props.showLogoutDialogue ? <LogoutDialogue/> : ''}
        <Route exact path='/register' component={RegisterForm} />
        <Route exact path='/' component={Homepage} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/add/project' component={ProjectSubmit} />  
        <Switch>
          <Route exact path='/projects' component={Projects} />  
          <Route exact path='/projects/:id' component={ProjectDash} />    
        </Switch>
        {this.props.loading ? <Loader /> : ''} 
        <Route path='/users' component={AllUsers} />        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading:state.reducers.loading,
  showLogoutDialogue:state.reducers.showLogoutDialogue
})

export default withRouter(connect(mapStateToProps)(App));