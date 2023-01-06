const express = require("express");
const router = express.Router();
const { getAllMenuItems, getMenuItemById, getMenuCategories, getMenuByCategory, updateMenuItem } = require("../../lib/admin/menu");

router.get("/", (req, res) => {
  res.render("admin/partials/test")
})

router.get("/all", (req, res) => {

  return getAllMenuItems().then(result => {
    const templateVars = {
      menu: result
    }

    return res.status(200).render("admin/menu", templateVars)
  })
    .catch(error => error.message)
})


router.get("/:id", (req, res) => {
  const menuId = req.params.id;


  console.log(menuId)
  return getMenuItemById(menuId).then(result => {
    const templateVars = {
      item: result
    }

    console.log("the result", result)

    return res.status(200).render("admin/menu_item", templateVars)
})
})


router.post("/", (req, res) => {

  return updateMenuItem(req.body)
    .then(result => {
      res.redirect(`/admin/menu/${req.body.id}`)
    })
    .catch(error => error.message)

})
module.exports = router;