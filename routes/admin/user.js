const db = require("../../db/connection")
const express = require("express");
const router = express.Router();

const { getUserById, getAllUsers, userSearch, updateUser } = require("../../lib/admin/users")
const { getOrdersByUser } = require("../../lib/admin/orders")

router.get("/", (req, res) => {
  res.status(200).json({ message: "Orders Route" })
})

// Get All Users from database.
router.get("/all", (req, res) => {
  return getAllUsers().then(data => {
    const templateVars = {
      user: data
    }
    return res.status(200).render("admin/users", templateVars)
  })
    .catch(error => error.message)
})

// Get User by ID from database.
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  return getUserById(userId)
  .then(data => {


    return getOrdersByUser(userId)
    .then(userOrders =>
      {
        const templateVars = {
          user: data,
          orders: userOrders
        }
        return res.status(200).render("admin/user", templateVars)
      })

  })
    .catch(error => error.message)
})


// Search for a user by email, phone number or name.
router.post("/search/", (req, res) => {
  const searchParam = req.body.searchParam;

  return userSearch().then(data => {
    const templateVars = {
      user: data
    }
    return res.status(200).render("admin/users", templateVars)
  })
    .catch(error => error.message)
})



// Update a user
router.post("/:id", (req, res) => {

  const { email, name, phone_number, status, userId } = req.body;

  const user = {
    email,
    name,
    phone_number,
    status,
    id: userId
  }

  return updateUser(user).then(data => {
    const templateVars = {
      user: data
    }
    return res.status(200).render("admin/user", templateVars)
  })
    .catch(error => error.message)
})




module.exports = router;