const { Client } = require("pg");

const dbParams = {
  host: "138.197.130.58",
  port: 5432,
  user: "labber",
  password: "labber",
  database: "midterm",
};

const db = new Client(dbParams);

db.connect();

const getMenuCategories = () => {
  const text = "SELECT DISTINCT description FROM menu_items";
  const values = [];

  return db
    .query(text)
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error);
    })
};

const getMenuItemsByCateogry = (category) => {
  const text = "SELECT * FROM menu_items WHERE description = $1";
  const values = [category];

  return db.query(text, values)
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  getMenuCategories,
  getMenuItemsByCateogry,
};
