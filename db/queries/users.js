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
