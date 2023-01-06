const db = require("../../db/connection");

const getReviewsForHome = () =>{
  const query = "SELECT * FROM reviews LIMIT 10 ORDER BY id DESC";
  return db.query(query).then(result => result.rows).catch(error => error.message)
}

module.exports = {
  getReviewsForHome
}