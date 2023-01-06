const db = require("../../db/connection");

// helper functions
const getUserById = (userId) => {
  const query =
    "SELECT id, email, name, phone_number, status, role FROM users WHERE id = $1";
  const values = [userId];

  return db
    .query(query, values)
    .then((result) => result.rows[0])
    .catch((error) => error.message);
};

const getAllUsers = () => {
  const query = "SELECT id, email, name, phone_number, status, role FROM users";

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((error) => error.message);
};

const getUserByEmail = (email) => {
  const query =
    "SELECT id, email, name, phone_number, status, role FROM users WHERE email = $1";
  const values = [email];

  return db
    .query(query, values)
    .then((result) => result.rows[0])
    .catch((error) => error.message);
};

const userSearch = (searchParam) => {
  const query =
    "SELECT * FROM users WHERE email LIKE $1 OR name LIKE  $1 OR phone_number LIKE $1";
  const values = [`%${searchParam}%`];

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((error) => error.message);
};

const updateUser = (user) => {
  const query =
    "UPDATE users SET email = $1, name = $2, phone_number = $3, status = $4 WHERE id = $5";
  const values = [
    user.email,
    user.name,
    user.phone_number,
    user.status,
    user.id,
  ];

  return db
    .query(query)
    .then((result) => result.rows)
    .catch((error) => error.message);
};

module.exports = {
  getUserById,
  getAllUsers,
  userSearch,
  updateUser,
};
