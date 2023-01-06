const express = require("express");
const menuRoute = require("./menu");
const messageRoute = require("./message");
const orderRoute = require("./order");
const reviewRoute = require("./review");
const userRoute = require("./user");
const loginRoute = require("./login")
const router = express.Router();

const { getOrdersForHome } = require("../../lib/admin/orders")
const { getMessagesForHome } = require("../../lib/admin/messages")
const { getReviewsForHome } = require("../../lib/admin/reviews")
router.get("/", async (req, res) => {

  const orders = await getOrdersForHome();
  const reviews = await getReviewsForHome();
  const messages = await getReviewsForHome();

  console.log(orders)

  const templateVars = {
    orders: orders,
    reviews: reviews,
    messages: messages
  }

  res.render("admin/home", templateVars)
})


router.use("/menu", menuRoute);
router.use("/message", messageRoute);
router.use("/order", orderRoute);
router.use("/review", reviewRoute);
router.use("/user", userRoute);
router.use("/login", loginRoute);

module.exports = router;