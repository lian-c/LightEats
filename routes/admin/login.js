const express = require("express");
const router = express.Router();

const adminUsers = [
  {
    username: "aingaran",
    password: "password"
  },
  {
    username: "admin",
    password: "admmin"
  }
]

router.get("/", (req, res) => {
  res.send("this is the login route")
})


router.post("/", (req, res) => {
  const { username, password } = req.body;
  return adminUsers.filter((user) => {
    if (user.username != username || user.password != password) {
      return res.send("Not Logged")
    }
    req.session.admin = "admin";
    req.session.adminUser = username;
    return res.redirect("/")
  })
})

module.exports = router;