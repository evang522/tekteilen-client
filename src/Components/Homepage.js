import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
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
          <section className='about-section-homepage'>
            <h2>What is Tekteilen?</h2>
            <section className='about-section-split'>
              <p className='about-tekteilen'>
              Tekteilen (German for ‘sharing-tech’) is a portal for connecting organizations needing help with web-technologies and developers wanting to share their experience to support good causes. 

<br/><br/>Users can sign up on the <Link to='/register'>register page</Link>, describe the skills they have, and then find projects that they have the ability to contribute to. 
<br/><br/> For more information, please visit our <a href='https://github.com/evang522/tekteilen-client'>github repo</a>
              </p>
              <img src='/laptop.png' alt='Laptop'/>
            </section>
          </section>
        </div>
    )


  }


}


export default withRouter(connect()(Homepage));