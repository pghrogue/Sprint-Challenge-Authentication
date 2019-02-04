import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import './App.css';

//Add a React client that connects to your API and has pages for Sign Up, Sign In and showing a list of Jokes.

// Routes:
import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import Jokes from './routes/Jokes';

class App extends Component {
  signout = () => {
    localStorage.removeItem('jwt');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to='/' exact>Home</NavLink> &nbsp; | &nbsp;
            <NavLink to='/register'>Register</NavLink> &nbsp; | &nbsp;
            <NavLink to='/login'>Login</NavLink> &nbsp; | &nbsp;
            <NavLink to='/logout' onClick={this.signout}>Log Out</NavLink>
          </nav>
          <main>
            <Route path='/' component={Home} exact></Route>
            <Route path='/register' component={Register} exact></Route>
            <Route path='/login' component={Login} exact></Route>
            <Route path='/jokes' component={Jokes} exact></Route>
            <Route path='/logout' component={Home} exact></Route>
          </main>
        </header>
      </div>
    );
  }
}

export default App;
