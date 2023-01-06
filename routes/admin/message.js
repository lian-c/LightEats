require("dotenv").config();
const express = require("express");
const db = require("../../db/connection");
const accountSid = "ACe5af4f0c5e555accf462cffd1e1d052e";
const authToken = "bd62b88c7e96aeb79e2380ec79f1c579";
const client = require("twilio")(accountSid, authToken);




const { getAllMessages, getMessageById } = require("../../lib/admin/messages")




const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Message Route" })
})

router.get("/all", (req, res) => {
  return getAllMessages().then(result => {

    const templateVars = {
      messages: result
    }

    console.log(templateVars)
    res.render("admin/messages", templateVars)

  })
    .catch(error => console.log(error.message))
})


router.get("/:id", (req, res) => {
  const messageId = req.params.id;
  return getMessageById(messageId).then(result => {
    const templateVars = {
      message: result
    }

    console.log(templateVars)
    res.render("admin/message", templateVars)

  })
    .catch(error => {
      console.log(error.message);
      res.send(error.message)
    })
})


router.post("/", (req, res) => {
  const orderId = req.body.orderId;
  const messageContent = req.body.messageContent;
  const messageMethod = req.body.messageMethod;

  const message = `RE: Order: ${orderId} -- ${messageContent}`


  // Get user contact details for order ID.
  const query = "SELECT * FROM orders JOIN users ON users.id = orders.user_id WHERE orders.id = $1";
  const values = [orderId];

  return db.query(query, values).then(result => {

    const phone_number = result.rows[0].phone_number;

    client.messages
      .create({ body: message, from: "+14195485361", to: phone_number })
      .then(message => {


        // INSERT MESSAGE INTO DATABASE
        const query = "INSERT INTO messages (orderid, messagebody, status) VALUES ($1, $2, $3)";
        const values = [orderId, message, 'sent'];

        db.query(query, values)
          .then(result => res.send(`Message sent`)
            .catch(error => console.log(error.message)))

      })
  })
    .catch(error => console.log(error.message))

  res.send(req.body)




  // Add message to details to messages table in database.

})

module.exports = router;