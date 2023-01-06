const e = require("express");
const db = require("../../db/connection");

const getAllMenuItems = () =>
{
  const query = "SELECT * FROM menu_items";
  return db.query(query).then(result=>result.rows).catch(error=>error.message)
}

const getMenuCategories = () =>
{
  const query = "SELECT DISTINCT description FROM menu_items ORDER BY description";
  return db.query(query).then(result=>result.rows).catch(error=>error.message)
}

const getMenuByCategory = (category) =>
{
  const query = "SELECT * FROM menu_items WHERE description = $1";
  const values = [category]
  return db.query(query, values).then(result=>result.rows).catch(error=>error.message)
}

const getMenuItemById = (id) =>
{
  const query = "SELECT * FROM menu_items WHERE id = $1";
  const values = [id]
  return db.query(query,values).then(result=>result.rows[0]).catch(error=>error.message)
}

const updateMenuItem = (item) =>
{

  const id = parseInt(item.id);
  const price = item.price.substring(1);
  const available = item.available;
  const values = [price, available, id]

 

console.log(values)
  
  const query = "UPDATE menu_items SET price = $1, available = $2 WHERE id = $3";

  return db.query(query).then(result=>{
    console.log(result)
  }).catch(error=>{
    console.log(error.message)
  })
}

module.exports = {getAllMenuItems, getMenuItemById, getMenuCategories, getMenuByCategory, updateMenuItem}