const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.post('/', (req,res) => {
console.log("button clicked", res.params)
})

router.get("/1", (req, res)=> {


  const id = req.params.id
  return db.query("SELECT * FROM orders WHERE id = id").then(result =>
    {
      order_id = result.rows[0].id;

      db.query("SELECT * FROM order_items WHERE order_id = order_id")
    })

  order = {
    user_name: "Aingaran",
    order_items: [1, 2, 3]
  }
  res.json(order)

})
module.exports = router;
