const express = require("express");
const router = express.Router();
const {getAllMenuItems} = require("../../lib/admin/menu");

router.get("/", (req, res) =>
{ 
  res.render("admin/partials/test")
})

router.get("/all", (req, res) => {
  return getAllMenuItems().then(data => {
    const templateVars = {
      menu: data
    }
    return res.status(200).render("admin/menu", templateVars)
  })
    .catch(error => error.message)
})

router.get("/:id", (req, res)=> {
  const menuId = req.params.id;
  res.status(200).json({menuId: menuId})
})

module.exports = router;