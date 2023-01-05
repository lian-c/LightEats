const express = require('express');
const router = express.Router();
const { getMenuItemByID } = require('../db/queries/menu');

//add to cart
router.get('/:id', (req, res) => {
  const id = req.params.id
  getMenuItemByID(id)
  .then(item => {
    const result = item[0]
    res.json(result)
  })
  res.status(200);

})

module.exports = router;
