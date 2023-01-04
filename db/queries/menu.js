const db = require('../connection');

const getMenu = () => {
  return db.query('SELECT * FROM menu_items;')
    .then(data => data.rows)
    .catch(err => err.message);
};

const getFeatured = () => {
  return db.query('SELECT * FROM menu_items WHERE is_featured = true;')
    .then(data => data.rows)
    .catch(err => err.message);
}

const getMenuItemByID = (id) => {
  return db.query(`SELECT * FROM menu_items WHERE id = '${id}';`)
    .then(data => data.rows)
    .catch(err => err.message);
}

module.exports = { getMenu, getFeatured, getMenuItemByID };
