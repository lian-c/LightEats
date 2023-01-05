const express = require('express');
const router = express.Router();
const { getOrder } = require('../db/queries/order');

const { getUserIDByEmail, createGuestUser } = require('../db/queries/users');
const { getMenuItemByID } = require('../db/queries/menu');
const { addNewOrder, addNewOrderItem } = require('../db/queries/order');

//calculates total price or prep time
const calcTotal = (order, priceOrPrep) => {
  let result = 0;
  for (const price of order) {
    result += price[priceOrPrep]
  }

  return result;
}


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
      const amount = calcTotal(result)
      const templateVars = { result: result, total: amount }
      res.json(templateVars)
    })
  res.status(200);
})


router.post('/', (req, res) => {
  
  const menuItemsArray = req.body.menu_items;
  let orderSummary = {};
  orderSummary.itemsOrdered = [];
  menuItemsArray.forEach(itemID => {
    getMenuItemByID(itemID)
      .then(menuItem => orderSummary.itemsOrdered.push(menuItem[0]))
  })

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
      return orderSummary.userID;
    })
    .then(userID => addNewOrder(userID))
    .then(newOrder => newOrder[0].id)
    .then(orderID => {
      orderSummary.orderID = orderID;
      menuItemsArray.forEach(itemID => addNewOrderItem(orderID, itemID))
      res.json(orderSummary);
    })

});


// const renderOrder = function(order) {
//   for (const food of order) {
//     const $orderItem = createOrderItems(food);
//     $('main').prepend($orderItem);
//   }
// };

// const createOrderItems = function(order) {
//   const $orderHTML = $(`

//             <tbody>
//               <tr>
//                 <td class="w-25">
//                   <img src="${order.food_photo_url}" class="menu_img">
//                 </td>
//                 <td class="menu_name">${order.name}</td>
//                 <td class="food_price">${order.price}</td>

//                 <td>
//                 </td>
//               </tr>
//             </tbody>

// `);
//   return $orderHTML;
// };




module.exports = router;
