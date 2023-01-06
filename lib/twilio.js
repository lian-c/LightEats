// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "ACe5af4f0c5e555accf462cffd1e1d052e";
const authToken = "bd62b88c7e96aeb79e2380ec79f1c579";
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({ body: "Hello from Twilio", from: "+14195485361", to: "+17168042069" })
  .then(message => console.log(message.sid));

  module.exports = {
    client
  }