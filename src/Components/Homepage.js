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
            <h5> Coding for Good</h5>
            <img className='homepage-image' src='/coding-vector.jpg' alt='Programmer'/>
          </header>
        </div>
    )


  }


}


export default withRouter(connect()(Homepage));