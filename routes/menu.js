const express = require('express');
const router = express.Router();
const { getMenu, getFeatured } = require('../db/queries/menu');

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

module.exports = router;
