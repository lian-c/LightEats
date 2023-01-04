const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

// Login without encrypted password.
const loginUser = (email) => {
  return db.query("SELECT * FROM user WHERE email = $1 && password = $2", [email, password])
    .then(result => {
      return result.rows[0];
    })
    .catch(error => {
      return console.log(error)
    })

}

module.exports = { getUsers };
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

module.exports = { getUsers, getUserIDByEmail, createGuestUser, loginUser };
