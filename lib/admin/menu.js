const db = require("../../db/connection");

const getAllMenuItems = () =>
{
  const query = "SELECT * FROM menu_items";
  return db.query(query).then(result=>result.rows).catch(error=>error.message)
}

const getMenuItemById = (id) =>
{
  const query = "SELECT * FROM menu_items WHERE id = $1";
  const values = [id]
  return db.query(query).then(result=>result.rows[0]).catch(error=>error.message)
}

module.exports = {getAllMenuItems, getMenuItemById}