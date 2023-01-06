const db = require("../../db/connection");

// orderID is an INT
const getOrderById = (orderId) => {

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

}

module.exports = {
  getOrdersByUser
}