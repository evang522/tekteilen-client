import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Projects from './Components/Projects';
import {Route} from 'react-router-dom';
import AllUsers from './Components/AllUsers';
import Loader from './Components/Loader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ProjectDash from './Components/ProjectDash';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Homepage from './Components/Homepage';
import ProjectSubmit from './Components/ProjectSubmit';


export class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path='/' component={Homepage} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/projects/dash/:id' component={ProjectDash} />    
        <Route exact path='/projects/new' component={ProjectSubmit} />  
        {this.props.loading ? <Loader /> : ''} 
        <Route exact path='/projects' component={Projects} />  
        <Route path='/users' component={AllUsers} />        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading:state.loading,
  currentProject:state.currentProject
})

export default withRouter(connect(mapStateToProps)(App));