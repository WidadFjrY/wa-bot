function sendingMessage(sender, content) {
  console.log("\nPesan Terkirim");
  console.log("Penerima\t:", sender);
  console.log("Isi Pesan\t:", content);
}

module.exports = sendingMessage;
