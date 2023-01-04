const express = require('express');
const router = express.Router();
const { getOrder} = require('../db/queries/order');

//calculates total price or prep time
const calcTotal = (order, priceOrPrep ) => {
  let result = 0;
  for(const price of order) {
    result += price[priceOrPrep]
  }

  return result;
}




router.get('/:id', (req, res) => {
  const id = req.params.id
  getOrder(id)
  .then(result => {
    const amount = calcTotal(result,"price")
    const time = calcTotal(result,"prep_time")

    const templateVars = { result:result, total:amount, prep:time}
    res.render("orders", templateVars);
  })

  res.status(200);
})

router.get('/:id/json', (req, res) => {
  const id = req.params.id
  getOrder(id)
  .then(result => {
    const amount = calcTotal(result)

    const templateVars = { result:result, total:amount}
    res.json(templateVars)
  })
  res.status(200);
})




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
