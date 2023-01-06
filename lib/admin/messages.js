const db = require("../../db/connection");

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
// const accountSid = "ACe5af4f0c5e555accf462cffd1e1d052e";
// const authToken = "bd62b88c7e96aeb79e2380ec79f1c579";
const client = require("twilio")(accountSid, authToken);





const getMessagesForHome = () =>{
  const query = "SELECT * FROM messages WHERE status = 'unread' LIMIT 10";
  return db.query(query).then(result => result.rows).catch(error => error.message)
}

const getAllMessages = () =>
{
  const query = "SELECT * FROM messages";

  return db.query(query)
    .then(result => result.rows)
    .catch(error => error.message)

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

const getMessageById = (id) =>
{
  const query = "SELECT * FROM messages WHERE id = $1";
  const values = [id];

  return db.query(query, values)
    .then(result => result.rows)
    .catch(error => error.message)

}

const sendMessage = (order, message) =>
{


  const to = order.to;

  client.messages
  .create({ body: message, from: "+14195485361", to: to })
  .then(message => {
    
    
    console.log(message.sid)
    const query = "INSERT INTO messages(orderId, userId, message, status) VALUES ($1, $2, $3, $4)";
  const values = [order.id, order.user_id, message, order.status];

  return db.query(query, values)
    .then(result => result.rows)
    .catch(error => error.message)
  
  });




}

module.exports =  {
  getMessagesForHome, sendMessage, getMessagesByOrder, getMessagesByUser, getMessagesByStatus, getAllMessages, getMessageById
}