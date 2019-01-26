import React, { Component } from 'react';
import axios from 'axios';

class Jokes extends Component {
  constructor() {
    super();
    this.state = {
      jokes: []
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
      .then()
      .catch();
    // end-axios.get
  }
  render() {
    return(
      <div>Jokes</div>
    );
  };
};

export default Jokes;