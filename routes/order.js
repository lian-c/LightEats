const express = require('express');
const router = express.Router();

router.post('/', (req,res) => {
console.log("button clicked")
})
module.exports = router;
