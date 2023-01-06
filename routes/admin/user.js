const db = require("../../db/connection")
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Orders Route" })
})

// Get All Users from database.
router.get("/all", (req, res) => {
  const query = "SELECT * FROM users";

  return db.query(query)
    .then(result => { return res.status(200).json(result.rows) })
    .catch(error => { return res.status(400).json({ error: error }) })
})

// Get User by ID from database.
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  const query = "SELECT id, email, name, phone_number, status, role FROM users WHERE id = $1";
  const values = [userId]

  return db.query(query, values)
    .then(result => {
      const templateVars = {
        user: result.rows
      }

      console.log(templateVars)
      return res.status(200).render("admin/user", templateVars)
    })
    .catch(error => { return res.status(400).json({ error: error.message }) })
})


// Search for a user by email, phone number or name.
router.post("/search/", (req, res) => {
  const searchParam = req.body.searchParam;

  const query = "SELECT * FROM users WHERE email LIKE $1 OR name LIKE  $1 OR phone_number LIKE $1";
  const values = [`%${searchParam}%`];

  return db.query(query, values)
    .then(result => {
      const templateVars = {
        orders: result.rows
      }

      console.log(templateVars)
      return res.status(200).render("admin/user", templateVars)
    })
    .catch(error => { return res.status(400).json({ error: error.message }) })
})


// Update a user
router.post("/:id", (req, res) => {

  const { email, name, phone_number, status, userId } = req.body;

  const query = "UPDATE users SET email = $1, name = $2, phone_number = $3, status = $4 WHERE id = $5";
  const values = [email, name, phone_number, status, userId];

  return db.query(query, values)
    .then(result => {
      const templateVars = {
        orders: result.rows
      }

      console.log(templateVars)
      return res.status(200).render("admin/order", templateVars)
    })
    .catch(error => { return res.status(400).json({ error: error.message }) })
})




module.exports = router;