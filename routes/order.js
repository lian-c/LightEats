const express = require('express');
const router = express.Router();
const { getOrder } = require('../db/queries/order');
const { getUserIDByEmail, createGuestUser } = require('../db/queries/users');
const { getMenuItemByID, getMenuItemsByIDs } = require('../db/queries/menu');
const { addNewOrder, addNewOrderItem } = require('../db/queries/order');



router.get('/checkout', (req, res) => {
  res.status(200).send("checkout")
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  getOrder(id)
    .then(result => {
      const amount = calcTotal(result, "price")
      const time = calcTotal(result, "prep_time")

      const templateVars = { result: result, total: amount, prep: time }
      res.render("orders", templateVars);
    })

  res.status(200);
})

router.get('/:id/json', (req, res) => {
  const id = req.params.id
  getOrder(id)
    .then(result => {
      const amount = calcTotal(result, "price")
      const time = calcTotal(result, "prep_time")
      const templateVars = { result: result, total: amount, prep: time }
      res.json(templateVars)
    })
  res.status(200);
})

const getUserFromSession = (session) => {
  return new Promise(function (resolve, reject) {
    resolve({id: session.userId})
  })
}



router.post('/', (req, res) => {
  let orderSummary = {};
  let userPromise;
  console.log(req.session.userId)
  if (req.session.userId) {
    // orderSummary.userStatus = "User Found";
    userPromise = getUserFromSession(req.session)
    orderSummary.userID = req.session.userId;
  } else {
    userPromise = createGuestUser(req.body.email, req.body.phone_number)
  }

      userPromise.then(user => {
        orderSummary.userID = user.id;
        // orderSummary.userStatus = "Guest User Created";
        const menuItemsArray = req.body.menu_items.split(",");

        orderSummary.itemsOrdered = [];
        getMenuItemsByIDs(menuItemsArray)
        .then((rows) => {
          // console.log(rows)
          // rows.forEach(menuItem => orderSummary.itemsOrdered.push(menuItem))
          orderSummary.itemsOrdered = rows
          addNewOrder(orderSummary.userID)
          .then(newOrder => newOrder[0].id)
          .then(orderID => {
                orderSummary.orderID = orderID;
                menuItemsArray.forEach(itemID => addNewOrderItem(orderID, itemID))
                // console.log(orderSummary);
                console.log(orderID)
                res.redirect(`/order/${orderID}`)

              })
          })
        })

});


//calculates total price or prep time for orders.ejs file
const calcTotal = (order, priceOrPrep) => {
  let result = 0;
  for (const price of order) {
    result += price[priceOrPrep]
  }
  return result;
}
module.exports = { calcTotal};




module.exports = router;
