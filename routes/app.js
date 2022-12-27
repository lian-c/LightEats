const express = require('express');
const router  = express.Router();
const {getFeatured} = require('../db/queries/menu');

// router.get('/', (req, res) => {
//   getFeatured()
//   .then(featured => {
//     console.log("Featured", featured);
//     res.json({featured});
//   })
//   .catch(err => {
//     res
//       .status(500)
//       .json({ error: err.message });
//   });
// });

module.exports = router;