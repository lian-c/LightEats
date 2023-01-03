const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>
{ 
  res.status(200).json({message: "Menu Route"})
})

router.get("/:id", (req, res)=> {
  const menuId = req.params.id;
  res.status(200).json({menuId: menuId})
})

module.exports = router;