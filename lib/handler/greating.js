const sendingMessage = require("../sending-message");

function greeting(client, sender, pushname) {
  let today = new Date();
  let hourNow = today.getHours();
  let greeting;

  if (hourNow >= 0 && hourNow < 12) {
    greeting = "Selamat Pagi";
  } else if (hourNow >= 12 && hourNow < 18) {
    greeting = "Selamat Siang";
  } else if (hourNow >= 18 && hourNow < 24) {
    greeting = "Selamat Malam";
  }

  let content = `${greeting} 😊, *${pushname}*. \nUntuk melihat catatan ketik /notes`;

  client.sendMessage(sender, content);
  sendingMessage(pushname, content);

  return greeting;
}

module.exports = greeting;
