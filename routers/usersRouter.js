const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // Used for hashing passwords!

// I recommend that you store your users in MongoDB using Mongoose instead of this.
const users = [
  // These are just some test users with passwords.
  // The passwords are in clear text for testing purposes (don't do this in production).
  { id: 0, username: "prf", password: '123' },
];

// We run through all users and hash their password. 
// Ideally, this should happen only in POST /api/users/ when signing up a new user,
// or in PUT /api/users/ when changing the password.
users.forEach(async user => {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) reject(err); else resolve(hash);
    });
  });

  user.hash = hashedPassword; // Storing the hash+salt on the user object.
  delete user.password; // Let's remove the clear text password as well
  console.log(`Hash generated for ${user.username}:`, user); // Logging for debugging purposes
});

// Create the routes and export the router
module.exports = secret => {

  router.post('/', (req, res) => {
    // TODO: Implement user account creation
    res.status(501).json({ msg: "create new user not implemented" });
  });

  router.patch('/', (req, res) => {
    // TODO: Implement user update (change password, etc).
    res.status(501).json({ msg: "update user not implemented" });
  });

  // This route takes a username and a password and creates an auth token
  // POST /api/users/authenticate
  router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      let msg = "Username or password missing!";
      console.error(msg);
      res.status(401).json({ msg: msg });
      return;
    }

    const user = users.find((user) => user.username === username);
    if (user) { // If the user is found
      if (bcrypt.compareSync(password, user.hash)) {
        const payload = { username: username };
        const token = jwt.sign(payload, secret, { algorithm: 'HS512', expiresIn: '1h' });

        res.json({
          msg: `User '${username}' authenticated successfully`,
          token: token
        });
      } else {
        res.status(401).json({ msg: "Password mismatch!" })
      }
    } else {
      res.status(404).json({ msg: "User not found!" });
    }
  });

  return router;
};