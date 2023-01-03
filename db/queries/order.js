const db = require('../connection');

const newOrder = (item) => {
  const query = 'INSERT INTO order_items order_id, item_id VALUES ($1, $2)';
  const values = [order_id, item_id]
  return db.query(query,values)
    .then(data => data.rows)
    .catch(err => err.message);
};

const getOrder = () => {
  return db.query('SELECT * FROM order_items INNER JOIN menu_items ON order_items.item_id=menu_items.id WHERE order_id=1;')
  .then(data => data.rows)
  .catch(err => err.message);
}

module.exports = { newOrder, getOrder };
