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

router.get("/", async (req, res) => {

  const orders = await getOrdersForHome();
  const messages = await getMessagesForHome();

  console.log(messages)

  const templateVars = {
    orders: orders,
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