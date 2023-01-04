const express = require('express');
const router = express.Router();

const { getUserIDByEmail, createGuestUser } = require('../db/queries/users');
const { getMenuItemByID } = require('../db/queries/menu');

router.post('/', (req, res) => {
  let orderSummary = {};
  console.log("req.body", req.body)
  const menuItemsArray = req.body.menu_items;
  getUserIDByEmail(req.body.email)
    .then(userID => {
      if (userID[0]) {
        orderSummary.userStatus = "User Found";
        orderSummary.userID = userID[0].id;
      }
      else {
        createGuestUser(req.body.email)
          .then(guestUser => {
            orderSummary.userStatus = "Guest User Created";
            orderSummary.userID = guestUser[0].id;
          })
      }
      orderSummary.itemsOrdered = [];
      menuItemsArray.forEach(element => {
        console.log('element', element);
        getMenuItemByID(element)
          .then(menuItem => {
            orderSummary.itemsOrdered.push(menuItem[0]);
            console.log('orderSummary', orderSummary);
          })

      });

    })


});




module.exports = router;
