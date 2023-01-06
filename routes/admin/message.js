require("dotenv").config();
const express = require("express");
const db = require("../../db/connection");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);




const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Message Route" })
})

router.get("/:id", (req, res) => {
  const messageId = req.params.id;
  res.status(200).json({ messageId: messageId })
})


router.post("/send", (req, res) => {
  const orderId = req.body.orderId;
  const messageContent = req.body.messageContent;
  const messageMethod = req.body.messageMethod;


  // Get user contact details for order ID.
  const query = "SELECT * FROM orders JOIN users ON users.id = orders.user_id WHERE orders.id = $1";
  const values = [orderId];

  return db.query(query, values).then(result => {
    return res.send(result.rows[0]);
  })

  res.send(req.body)


  if (messageMethod === "email") {
    // send via nodemailer
  }

  if (messageMethod === "text") {
    // send via twillio
  }




  // Add message to details to messages table in database.

})

module.exports = router;