const express = require('express');
const router = express.Router();

router.post('/', (req,res) => {
console.log("button clicked", res.params)
})
module.exports = router;
