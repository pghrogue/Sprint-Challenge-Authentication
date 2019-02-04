import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      msg: ""
    }
  };

  // Handle input change - set state, adding each character.
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Handle form submission - send through axios to api.
  handleSubmit = (event) => {
    event.preventDefault();

    // Variables to send to server for auth
    const auth = {
      username: this.state.username,
      password: this.state.password
    };
    const endpoint = 'http://localhost:3300/api/register';

    // Contact server:
    axios.post( endpoint, auth )
      .then( (res) => {
        console.log('response data: ', res.data);
        if( res.status === 201 ){
          this.setState({ msg: "Registered. Please Login now." });
        } else {
          this.setState({ msg: "Please try again later." });
        }
      })
      .catch( (err) => {
        console.log('error data: ', err );
        this.setState({ msg: "Please try again with a different username."});
      });
    // end-axios.post
    this.setState({
      username: "",
      password: ""
    });
  };

  // Render page:
  render() {
    return (
      <div className='register'>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlForm='username'>Username: </label>
            <input name='username' type='text' onChange={this.handleInputChange} value={this.state.username}/>
          </div>

          <div>
            <label htmlFor='password'>Password: </label>
            <input name='password' type='password' onChange={this.handleInputChange} value={this.state.password}/>
          </div>

          <div>
            <button type='submit'>Register</button>
          </div>
        </form>
        <div>{this.state.msg}</div>
      </div>
    );
  };

};

export default Register;