const express = require('express');
const router = express.Router();
const { getOrder, calculateTotal } = require('../db/queries/order');


router.get('/:id', (req, res) => {
  const id = req.params.id
  getOrder(id)
  .then(result => {
    const templateVars = { result:result}
    res.render("orders", templateVars);
  })

  res.status(200);
})

router.get('/:id/total', (req, res) => {
  const id = req.params.id
  getOrder(id)
  .then(result => {
    res.json(result)
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
