const express = require('express');
const router = express.Router();
const { getOrder } = require('../db/queries/order');

router.get('/order/1', (req, res) => {
  res.status(200).send('test')
})

module.exports = router;
