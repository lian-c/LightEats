const db = require('../connection');

const newOrder = (item) => {
  const query = 'INSERT INTO order_items order_id, item_id VALUES ($1, $2)';
  const values = [order_id, item_id]
  return db.query(query,values)
    .then(data => data.rows)
    .catch(err => err.message);
};


module.exports = { newOrder };
