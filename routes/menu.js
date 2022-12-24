const express = require('express');
const router  = express.Router();
const {getMenu} = require('../db/queries/menu');

router.get('/', (req, res) => {
  getMenu()
    .then(menu => {
      res.json({menu});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});



module.exports = router;
