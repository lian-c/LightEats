const express = require('express');
const router = express.Router();
const { getMenu, getFeatured } = require('../db/queries/menu');
const { getMenuCategories,
  getMenuItemsByCateogry } = require("../helper/menu")

router.get('/', (req, res) => {
  getMenu()
    .then(menuItems => {
      const pizzaItems = [];
      const wingItems = [];
      const dipItems = [];
      const beverageItems = [];
      for (let item of menuItems) {
        if (item.description === 'pizza') {
          pizzaItems.push(item);
        }
        if (item.description === 'chicken wings') {
          wingItems.push(item);
        }
        if (item.description === 'dipping sauce') {
          dipItems.push(item);
        }
        if (item.description === 'beverage') {
          beverageItems.push(item);
        }
      }
      const templateVars = {
        pizzas: pizzaItems,
        wings: wingItems,
        dips: dipItems,
        beverages: beverageItems
      };
      res.json(templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


router.get('/featured', (req, res) => {
  getFeatured()
    .then(featuredItems => res.json(featuredItems))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


router.get("/categories", async (req, res) => {
  const data = await getMenuCategories();
  res.status(200).json(data)

})

router.get("/:category/items", async (req, res) => {
  const category = req.params.category;
  const data = await getMenuItemsByCateogry(category);
  res.status(200).json(data)
})

module.exports = router;
