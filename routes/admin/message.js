const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>
{ 
  res.status(200).json({message: "Message Route"})
})

router.get("/:id", (req, res)=> {
  const messageId = req.params.id;
  res.status(200).json({messageId: messageId})
})

module.exports = router;