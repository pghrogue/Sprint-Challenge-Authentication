const axios = require('axios');
const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const newUser = req.body;

  // Only add if username & password are not empty
  if( newUser.username && newUser.password ){
    // hash the password:
    newUser.password = bcrypt.hashSync(newUser.password, 12);

    // Insert into db:
    db(`users`).insert(newUser)
      .then( (newId) => {
        res.status(201).json({ id: newId[0] });
      })
      .catch( (err) =>{
        res.status(500).json({ error: `Could not register new user: ${err}` });
      });
    // end-db.insert
  } else {
    // Missing username or password
    res.status(400).json({ error: "Please enter a username and a password." });
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
