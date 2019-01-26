import React, { Component } from 'react';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      msg: ""
    }
  };

  render() {
    return (
      <div className='register'>
        <form>
          <div>
            <label htmlForm='username'>Username: </label>
            <input name='username' type='text'/>
          </div>

          <div>
            <label htmlFor='password'>Password: </label>
            <input name='password' type='password'/>
          </div>

          <div>
            <button type='submit'>Register</button>
          </div>
        </form>
      </div>
    );
  };

};

export default Register;