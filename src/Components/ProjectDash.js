import React from 'react';
import {connect} from 'react-redux';
import './css/ProjectDash.css';
import {getAllProjects} from '../state/actions';
import {withRouter} from 'react-router-dom';

export class ProjectDash extends React.Component {

  componentDidMount() {
    this.props.dispatch(getAllProjects());
  }

  render() {
    if (this.props.project) {
      return (
        <section className='project-dashboard'>
          <h1 className='project-dash-header'>{this.props.project.title}</h1>
        </section>
      )
    } else {
      return (

      <p className='project-dash-header'>Loading</p>
      
    )
    }
  }
}

  const mapStateToProps = (state, props) => ({
    project: state
      .reducers
      .projects
      .find(project => project.id === Number(props.match.params.id))
  })

  export default withRouter(connect(mapStateToProps)(ProjectDash));
