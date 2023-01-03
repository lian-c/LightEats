const express = require('express');
const router = express.Router();
const { getOrder } = require('../db/queries/order');

router.get('/1', (req, res) => {
  getOrder()
  .then(result => {
    res.json(result)
  })
  res.status(200);
})

module.exports = router;
