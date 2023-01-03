/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getUsers } = require('../db/queries/users');


router.get('/', (req, res) => {
  getUsers()
  .then(usersData => {
    res.json(usersData)
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  // const user = users.filter(user => user.email === req.body.email);

  // if (!user) {
  //   res.status(401).json({ error: "Login error" });
  // }
  req.session.userId = req.body.userID;
  res.status(200).json(user);
});

// router.get("/profile", (req, res) => {
//   res.send(`Fake Profile Page for user ${req.session.userId}`);
// })


module.exports = router;
