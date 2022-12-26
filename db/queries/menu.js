const db = require('../connection');

const getMenu = () => {
  return db.query('SELECT * FROM menu_items;')
    .then(data => data.rows)
    .catch(err => err.message);
};

module.exports = { getMenu };
