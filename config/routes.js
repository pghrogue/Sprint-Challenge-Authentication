const axios = require('axios');
const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const jwtKey =
  process.env.JWT_SECRET ||
  'add a .env file to root of project with the JWT_SECRET variable';

// Generate token to send on login
function generateToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: '1hr',
    jwtid: `${user.id}`
  };
  return jwt.sign(payload, jwtKey, options);
}

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
  const login = req.body;

  // Only do the work if all the info is sent:
  if( login.username && login.password ){
    // Get info from database to compare:
    db(`users`).where('username', login.username ).limit(1)
      .then( (user) => {
        if( user.length && bcrypt.compareSync(login.password, user[0].password) ){
          // Generate token here & insert into res
          const token = generateToken(user[0]);
          res.status(201).json({ info: "Logged in", token });
        } else {
          res.status(401).json({ error: "Invalid username or password." });
        }
      })
      .catch( (err) => {
        res.status(500).json({ error: `Could not login: ${err}`});
      });
    // end-db.select
  } else {
    // Missing user or pass
    res.status(400).json({ error: "Please enter a username and a password." });
  }
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
