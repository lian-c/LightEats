const db = require('../connection');

const getOrder = (order_id) => {
  const query = 'SELECT menu_items.name as name, users.name as user,  price, food_photo_url, prep_time, order_status, order_time, completed_time FROM order_items INNER JOIN menu_items ON order_items.item_id=menu_items.id INNER JOIN orders ON order_id=orders.id INNER JOIN users ON users.id=orders.user_id  WHERE order_id=$1;';
  const values = [order_id]
  return db.query(query,values)
  .then(data => data.rows)
  .catch(err => err.message);
};

const addNewOrder = (userID) => {
  return db.query(`
  INSERT INTO orders (user_id, order_status)
  VALUES (${userID}, 'new')
  RETURNING *;
  `)
    .then(data => data.rows)
    .catch(err => console.error(err.message));
};

const addNewOrderItem = (orderID, itemID) => {
  const query = 'INSERT INTO order_items (order_id, item_id) VALUES ($1, $2) RETURNING *';
  const values = [orderID, itemID]
  return db.query(query,values)
    .then(data => data.rows)
    .catch(err => err.message);
};


// const calculateTotal = (order_id) => {
//   const query = 'SELECT  SUM(price) as Total, SUM(prep_time) as Cook_time FROM order_items INNER JOIN menu_items ON order_items.item_id=menu_items.id WHERE order_id= $1;'
//   const values = [order_id]
//   return db.query (query, values)
//   .then(data => data.rows)
//   .catch(err => err.message);
// }

module.exports = { getOrder, addNewOrder, addNewOrderItem};
