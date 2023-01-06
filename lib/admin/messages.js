const db = require("../../db/connection");

const getMessgesForHome = () =>{
  const query = "SELECT * FROM messages WHERE unread = true LIMIT 10 ORDER BY id DESC";
  return db.query(query).then(result => result.rows).catch(error => error.message)
}

const getMessagesByStatus = (status) =>
{
  const query = "SELECT * FROM messages WHERE status = $1";
  const values = [status];

  return db.query(query, values)
    .then(result => result.rows)
    .catch(error => error.message)

}

const getMessagesByUser = (userId) =>
{
  const query = "SELECT * FROM messages WHERE userId = $1";
  const values = [userId];

  return db.query(query, values)
    .then(result => result.rows)
    .catch(error => error.message)

}

const getMessagesByOrder = (orderId) =>
{
  const query = "SELECT * FROM messages WHERE orderId = $1";
  const values = [orderId];

  return db.query(query, values)
    .then(result => result.rows)
    .catch(error => error.message)

}

const sendMessage = (order, message) =>
{
  const query = "INSERT INTO messages(orderId, userId, message, status) VALUES ($1, $2, $3, $4)";
  const values = [order.id, order.user_id, message, order.status];

  return db.query(query, values)
    .then(result => result.rows)
    .catch(error => error.message)

}