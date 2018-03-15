import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './css/Homepage.css';


export class Homepage extends React.Component {

  render() {



    return (
        <div className='homepage-container'>
          <header>
            <h1> TekTeilen </h1>
          </header>
        </div>
    )


  }


}


export default withRouter(connect()(Homepage));