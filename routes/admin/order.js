const db = require("../../db/connection")
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Orders Route" })
})

// Get all orders from database.
router.get("/all", (req, res) => {
  const query = "SELECT * FROM orders ";

  return db.query(query).then(result => {
    return res.status(200).json(result.rows)
  })
    .catch(error => {
      return console.log(error)
    })
})

// Get order by ID from database.
router.get("/:id", (req, res) => {
  const orderId = req.params.id;
  const query = "SELECT * FROM orders WHERE id = $1";
  const values = [orderId];

  return db.query(query, values).then(result => {
    return res.status(200).json(result.rows)
  })
    .catch(error => {
      return console.log(error)
    })
})

module.exports = router;