/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

// fake user data.

const {users} = require('../db/fakeUserData');

router.get('/login', (req, res) => {
  res.render('user/login');
});

router.post("/login", (req, res) => {
  const user = users.filter(user => user.email === req.body.email);

  if (!user) {
    res.status(401).json({ error: "Login error" });
  }
  req.session.userId = user.id;
  res.status(200).json(user);
});

router.get("/profile", (req, res) => {
  res.send(`Fake Profile Page for user ${req.session.userId}`);
})


module.exports = router;
