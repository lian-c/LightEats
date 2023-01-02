const db = require('../connection');

const newOrder = (item) => {
  return db.query('INSERT INTO order_items order_id, item_id VALUES ')
    .then(data => data.rows)
    .catch(err => err.message);
};


module.exports = { newOrder };
