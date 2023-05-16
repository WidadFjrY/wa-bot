const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");


const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    executablePath: "/usr/bin/google-chrome",
  },
});

client.on("qr", (qr) => {
  console.log("PINDAI KODE INI UNTUK LOGIN KE WHATSAPP");
  qrcode.generate(qr, { small: true });
});

client.on("loading_screen", (msg) => {
  console.log("Loading Chat -", msg);
});

client.on("ready", () => {
  console.log("Client Ready");
});

client.on("auth_failure", (msg) => {
  console.log("autentikasi gagal", msg);
});

client.initialize();

client.on("message", async (message) => {
  message.reply("Maaf Bot sendang dalam perbaikan, We will back 😉");
});
