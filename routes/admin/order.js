const db = require("../../db/connection")
const express = require("express");
const router = express.Router();
const { getOrderById, getAllOrders, getOrdersByStatus, getOrdersByUser, updateOrder } = require("../../lib/admin/orders");
const {getMessagesByOrder} = require("../../lib/admin/messages");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Orders Route" })
})

// Get All Orders from database.
router.get("/all", (req, res) => {
  const query = "SELECT orders.id, orders.order_status, orders.order_time, users.name, users.id as userid FROM orders JOIN users ON orders.user_id = users.id";

  return db.query(query)
    .then(result => { 

      const templateVars = {
        orders: result.rows,
      }
      return res.status(200).render("admin/orders", templateVars)


    })
    .catch(error => { return res.status(400).json({ error: error }) })
})

// Get New Orders from Database.
router.get("/new", (req, res) => {
  const query = "SELECT orders.id, orders.order_status, orders.order_time, users.name FROM orders JOIN users ON orders.user_id = users.id WHERE orders.order_status = 'new'";

  return db.query(query, values)
    .then(result => { return res.status(200).json(result.rows) })
    .catch(error => { return res.status(400).json({ error: error }) })
})

// Get order by ID from database.
router.get("/:id", (req, res) => {
  const orderId = req.params.id;
  // const query = "SELECT orders.id as orderId, orders.order_status as orderStatus, orders.order_time as orderTime, orders.completed_time as orderCompletedTime, users.id as userId, users.name as userName, menu_items.name as topping FROM orders JOIN users ON orders.user_id = users.id  JOIN order_items ON orders.id = order_items.order_id JOIN menu_items ON menu_items.id = order_items.item_id WHERE orders.id = $1";

  const query = "SELECT menu_items.name as menuname, menu_items.id as menuid, users.name as username, users.id as userid,  price, food_photo_url, prep_time, order_status as orderstatus, order_time as ordertime, completed_time, orders.id as orderid FROM order_items INNER JOIN menu_items ON order_items.item_id=menu_items.id INNER JOIN orders ON order_id=orders.id INNER JOIN users ON users.id=orders.user_id  WHERE order_id=$1"
  const values = [orderId];

  return db.query(query, values)
    .then(result => {
      console.log(result.rowCount)


      const templateVars = {
        order: result.rows,
        message: null
      }


      if (result.rowCount === 0)
      {
        const templateVars = {
          message: "Cannot Find Order"
        }
        return res.status(200).render("admin/error", templateVars)
      }

      
      return res.status(200).render("admin/order", templateVars)
    })
    .catch(error => { return res.status(400).json({ error: error.message }) })
})


// Update Order Status
router.post("/", (req, res) => {

  const { status } = req.body;

  const orderId = parseInt(req.body.orderid)
  const order = {
    status,
    id: orderId
  }

  console.log(order)

  return updateOrder(order).then(result => {
    console.log(result)
    const templateVars = {
      orders: result.rows[0]
    }

    console.log(templateVars)
    return res.status(200).render("admin/order", templateVars)
  })
    .catch(error => { return res.status(400).json({ error: error.message }) })
})

// 



module.exports = router;