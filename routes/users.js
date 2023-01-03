const express = require('express');
const router = express.Router();
const { getUsers } = require('../db/queries/users');

router.post("/logout", (req, res) => {
  req.session.userId = "";
  res.status(200).send(req.body);
});

router.get('/', (req, res) => {
  getUsers()
  .then(usersData => {

     res.json({userLoggedIn: req.session.userId, usersData });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

router.post("/login", (req, res) => {
  req.session.userId = req.body.userID;
  res.status(200).send(req.body);
});




module.exports = router;
