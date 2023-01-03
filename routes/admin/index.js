const express = require("express");
const router = express.Router();
const menuRoute = require("./menu");
const messageRoute = require("./message");
const orderRoute = require("./order");


router.use("/", express.static('public/admin'));


router.use("/menu", menuRoute);
router.use("/message", messageRoute);
router.use("/order", orderRoute);


module.exports = router;