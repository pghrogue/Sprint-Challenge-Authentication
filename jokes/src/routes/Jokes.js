import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Jokes extends Component {
  constructor() {
    super();
    this.state = {
      jokes: [],
      redirect: false
    }
  };

  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const endpoint = 'http://localhost:3300/api/jokes';
    const options = {
      headers: {
        Authorization: token
      }
    };

    axios.get( endpoint, options )
      .then( (res) => {
        this.setState({ jokes: res.data });
      })
      .catch( (err) => {
        console.log( 'error :', err );
        this.setState({ redirect: true });
      });
    // end-axios.get
  }
  render() {
    if( this.state.redirect === true ){
      return(<Redirect to='/home'/>);
    }
    return(
      <div className='jokes'>
        <h1>Jokes:</h1>
        {this.state.jokes.map( (joke) => {
          return(
            <div key={joke.id}>{joke.joke}</div>
          );
        })}
      </div>
    );
  };
};

export default Jokes;