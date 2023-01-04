const db = require('../connection');

const getMenu = () => {
  // return db.query('SELECT * FROM menu_items;')
  return db.query('SELECT menu_items.*, ROUND(AVG(rating),2) as rating, COUNT( rating) FROM menu_items LEFT JOIN menu_item_reviews ON menu_item_id=menu_items.id GROUP BY menu_items.id ;')
  // return db.query('SELECT menu_items.*, ROUND(AVG(rating),2) as rating FROM menu_items LEFT JOIN menu_item_reviews ON menu_item_id=menu_items.id GROUP BY menu_items.id ;')
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

  // const getReviews = (menu_id) => {
    //   const query = 'SELECT ROUND(AVG(rating),2) FROM menu_item_reviews WHERE menu_item_id = $1'
    //   const values = [menu_id]
    //   return db.query(query,values)
    //   .then(data => data.rows)
    //   .catch(err => err.message);
    // }
    module.exports = { getMenu, getFeatured, getMenuItemByID };

