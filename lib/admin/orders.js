const db = require("../../db/connection");

const getOrdersForHome = () => {
  const query = "SELECT * FROM orders ORDER BY id DESC LIMIT 5";
  return db.query(query).then(result => result.rows).catch(error => error.message)
}

const getOrderById = (orderId) => {
  const query = "SELECT * FROM orders WHERE id = $1"
  const values = [userId];

  return db.query(query, values)
    .then(result => result.row[0])
    .catch(error => error.message)

}

const getAllOrders = () =>
{
  const query = "SELECT * FROM orders"

  return db.query(query, values)
    .then(result => result.rows)
    .catch(error => error.message)
}

const getOrdersByStatus = (status) =>
{
  const query = "SELECT * FROM orders WHERE order_status = $1";
  const values = [status];

  return db.query(query, values)
    .then(result => result.rows)
    .catch(error => error.message)
}

// userId is an INT
const getOrdersByUser = (userId) => {
  const query = "SELECT * FROM orders WHERE user_id = $1"
  const values = [userId];

  return db.query(query, values)
    .then(result => result.rows)
    .catch(error => error.message)
}

// order is an object
const updateOrder = (order) => {
  let query = ""

  if (order.status == "completed")
  {
    const now = new Date().toISOString();
    query = "UPDATE orders SET order_status = $2, completed_time = now WHERE id = $1";
  }
  else
  {
    query = "UPDATE orders SET order_status = $2 WHERE id = $1"
  }
  const values = [order.id, order.status]

  return db.query(query, values)
  .then(result => result.rows)
  .catch(error => error.message)
}

module.exports = {
  getOrdersForHome,
  getOrdersByUser,
  getAllOrders,
  getOrderById,
  getOrdersByStatus,
  updateOrder

}