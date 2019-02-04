import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt');

    if( token ) {
      this.setState({ redirect: true });
    }
  }
  render() {
    if( this.state.redirect === true ){
      return <Redirect to='/jokes'/>
    }
    return(
      <div>
        <h2>Welcome to Dad Jokes! Your home of bad dad jokes from the web.</h2>
        <p>Please Login or SignUp for your daily fill!</p>
      </div>
    );
  };
};
export default Home;