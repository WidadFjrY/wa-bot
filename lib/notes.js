const fs = require("fs");
const sendingMessage = require("./sending-message");

function notes(client, sender, pushname) {
  fs.readFile("./text/notes.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    client.sendMessage(sender, data);
    sendingMessage(pushname, data);
  });
}

module.exports = notes;
