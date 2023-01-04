const express = require('express');
const router = express.Router();
const { getOrder, calculateTotal } = require('../db/queries/order');


router.get('/1', (req, res) => {
  const calculateTotal = () => {
    return db.query('SELECT  SUM(price) as Total, SUM(prep_time) as Cook_time FROM order_items INNER JOIN menu_items ON order_items.item_id=menu_items.id WHERE order_id=1;')
    .then(data => data.rows)
    .catch(err => err.message);
  }

  getOrder()
  .then(result => {
    const templateVars = { result:result}
    res.render("orders", templateVars);
  })

  res.status(200);
})

router.get('/1/total', (req, res) => {
  calculateTotal()
  .then(result => {
    const templateVars = { result:result}
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
