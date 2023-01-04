const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserIDByEmail = (email) => {
  return db.query(`SELECT id FROM users WHERE email = '${email}';`)
    .then(data => {
      return data.rows;
    })
    .catch(err => err.message);
};

const createGuestUser = (email) => {
  return db.query(`
  INSERT INTO users (email, password, role) 
  VALUES ('${email}', 'password', 'guest')
  RETURNING *;
  `)
    .then(data => {
      return data.rows;
    })
    .catch(err => err.message);
};

module.exports = { getUsers, getUserIDByEmail, createGuestUser };
