require("dotenv").config();
const express = require("express");
const db = require("../../db/connection");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const {getAllMessages} = require("../../lib/admin/messages")




const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Message Route" })
})

router.get("/all", (req, res) => {
  return getAllMessages().then(result=>{

    const templateVars = {
      messages: result
    }

    console.log(templateVars)
    res.render("admin/messages", templateVars)

  })
  .catch(error=>console.log(error.message))
})


router.get("/:id", (req, res) => {
  const messageId = req.params.id;
  res.status(200).json({ messageId: messageId })
})


router.post("/", (req, res) => {
  const orderId = req.body.orderId;
  const messageContent = req.body.messageContent;
  const messageMethod = req.body.messageMethod;


  // Get user contact details for order ID.
  const query = "SELECT * FROM orders JOIN users ON users.id = orders.user_id WHERE orders.id = $1";
  const values = [orderId];

  return db.query(query, values).then(result => {

    if (messageMethod == "text") {
      return res.send(result.rows[0].phone_number);
    }
    else {
      return res.send(result.rows[0].email);
    }

    // INSERT MESSAGE INTO DATABASE
    const query = "INSERT INTO messages (orderId, content, status) VALUES ($1, $2, $3)";
    const values = [orderId, messageContent, 'unread'];

    db.query(query, values).then(result => res.send(`Message sent`).catch(error => console.log(error.message)))

  })
  .catch(error=>console.log(error.message))

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