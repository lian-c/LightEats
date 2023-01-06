const express = require("express");
const menuRoute = require("./menu");
const messageRoute = require("./message");
const orderRoute = require("./order");
const reviewRoute = require("./review");
const userRoute = require("./user");
const loginRoute = require("./login")
const router = express.Router();

router.get("/", (req, res) => {

  // const orders = getOrdersForHome();
  // const reviews = getReviewsForHome();
  // const messages = getReviewsForHome();

  res.render("admin/home")
})


router.use("/menu", menuRoute);
router.use("/message", messageRoute);
router.use("/order", orderRoute);
router.use("/review", reviewRoute);
router.use("/user", userRoute);
router.use("/login", loginRoute);

module.exports = router;