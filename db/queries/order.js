const db = require('../connection');

const newOrder = (item) => {
  const query = 'INSERT INTO order_items order_id, item_id VALUES ($1, $2)';
  const values = [order_id, item_id]
  return db.query(query,values)
    .then(data => data.rows)
    .catch(err => err.message);
};

const getOrder = (order_id) => {
  const query = 'SELECT menu_items.name as food, users.name as name,  price, food_photo_url, prep_time, user_id as user, order_status, order_time, completed_time FROM order_items INNER JOIN menu_items ON order_items.item_id=menu_items.id INNER JOIN orders ON order_id=orders.id INNER JOIN users ON users.id=orders.user_id  WHERE order_id=$1;';
  const values = [order_id]
  return db.query(query,values)
  .then(data => data.rows)
  .catch(err => err.message);
}

// const calculateTotal = (order_id) => {
//   const query = 'SELECT  SUM(price) as Total, SUM(prep_time) as Cook_time FROM order_items INNER JOIN menu_items ON order_items.item_id=menu_items.id WHERE order_id= $1;'
//   const values = [order_id]
//   return db.query (query, values)
//   .then(data => data.rows)
//   .catch(err => err.message);
// }

module.exports = { newOrder, getOrder};
