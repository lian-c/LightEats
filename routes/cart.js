const express = require('express');
const router = express.Router();
// const connection = require("../db");



//checkout page
router.get("/", (req, res) => {
  res.send("cart route")
})


router.get("/add", (req, res) => {
  res.cookie('cart', [1,2,3,4])
  res.redirect("./details")

})

router.get("/count", (req, res) => {
  console.log(req.cookies);
  res.send("hllo")
})

router.get("/details", (req, res) => {
  console.log('the cookies', req.cookies)
  res.send(JSON.stringify(req.cookies))
})

router.post("/checkout", (req, res) => {

})

module.exports = router;