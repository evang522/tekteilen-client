import React from 'react';
import {getAllProjects, clearError, search, clearSearch, clearRedirects} from '../state/actions';
import {connect} from 'react-redux';
import {withRouter, Redirect, Link} from 'react-router-dom';
import './css/Projects.css';
// import store from '../state/store';

export class Projects extends React.Component{

  componentDidMount () {
    if (this.props.loggedIn) {
    this.props.dispatch(clearRedirects());
    this.props.dispatch(clearError())
    this.props.dispatch(getAllProjects());
    }
  }

  
  componentWillUnmount() {
    this.props.dispatch(clearSearch())
  }

  searchProjects = () => {
    this.props.dispatch(search(this.searchInput.value));
    this.searchInput.value= '';
  }

  handleKeyDown = function (e, cb) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      cb();
    }
  };


  render() {

    return (
      <div className='project-dashboard-container'>
      {this.props.loggedIn ? '' : <Redirect to='/login' />}
      <h1 className='projects-title'>
            View Available Projects
      </h1>
        {
          this.props.serverError ? <div className='app-error-message'>{this.props.serverError}</div> : 
        <div>
            <Link to='/add/project' className='create-new-project-button'>+New Project </Link>
            <div className='search-container'>
              <button onClick={this.searchProjects} className='search-project-button'>Search</button>
              <input onKeyDown={e => this.handleKeyDown(e,this.searchProjects)} type='text' ref={input => {this.searchInput = input}}className='search-input' placeholder = 'leave blank to return all projects '/>
            </div>
          <div className='projects-container'>

          {/* IF SEARCH IS SET TO TRUE */}
          {this.props.search && this.props.searchResults.length ? this.props.searchResults.map(project => (
          <div data-id={project.id} key={project.id} className='project-card'>
            <h1 className='project-card-title'> {project.title}</h1>
            <p className='project-card-description'> Description: {project.description}</p>
            <p className='project-card-organization'> Organization:{project.organization}</p> 
            <Link className='project-card-button' to={'/projects/' + project.id}>Open Project</Link>
          </div>)) : '' }

          {/* IF SEARCH IS SET TO FALSE */}
          {!this.props.search && this.props.projects && this.props.projects.length ? this.props.projects.map(project => (
          <div data-id={project.id} key={project.id} className='project-card'>
            <h1 className='project-card-title'> {project.title}</h1>
            <p className='project-card-description'> Description: {project.description}</p>
            <p className='project-card-organization'> Organization:{project.organization}</p> 
            <Link className='project-card-button' to={'/projects/' + project.id}>Open Project</Link>
          </div>)) : '' }

            </div>
          <div className='project-list-container'></div>
        </div>
        }

      </div>
    )
  }
}

const mapStateToProps = state => ({
  projects: state.reducers.projects || [],
  serverError:state.reducers.appError ? state.reducers.appError.serverError : null,
  loggedIn: state.reducers.authToken ? true : false,
  search: state.reducers.search,
  searchResults: state.reducers.searchResults
})

export default withRouter(connect(mapStateToProps)(Projects));