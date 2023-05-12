const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const path = require("path");
const {
  youtubeDownloaderMp3,
  youtubeDownloaderMp4,
} = require("./lib/handler/youtube-downloader");
const greeting = require("./lib/handler/greating");
const notes = require("./lib/notes");
const {
  feedReelDown,
  storiesDown,
} = require("./lib/handler/instagram-downloader");
const sendingMessage = require("./lib/sending-message");
const tiktokDownloader = require("./lib/handler/tiktok-downloader");

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
  let sender = (await message.getContact()).pushname;

  console.log("\nPengirim\t:", sender);
  console.log("Pesan\t\t:", message.body);
  console.log("Media\t\t:", message.hasMedia);

  if (
    message.body.toLowerCase() === "halo" ||
    message.body.toLowerCase() === "p" ||
    message.body.toLowerCase() === "hai" ||
    message.body.toLowerCase() === "hei"
  ) {
    greeting(client, message.from, sender);
  } else if (message.body === "/notes") {
    notes(client, message.from, sender);
  } else if (message.body.startsWith("/ytmp4 ")) {
    youtubeDownloaderMp4(message.body.split(" ")[1], client, message, sender);
  } else if (message.body === "/ytmp4") {
    const content =
      "Untuk mendownload YouTube gunakan format\n/ytmp4 linkyoutube\n Contoh : /ytmp4 https://youtu.be/FXfqLUuVBis";
    client.sendMessage(message.from, content);
    sendingMessage(sender, content);
  } else if (message.body.startsWith("/ytmp3 ")) {
    youtubeDownloaderMp3(message.body.split(" ")[1], client, message, sender);
  } else if (message.body === "/ytmp3") {
    const content =
      "Untuk mengkonversi YouTube ke mp3 gunakan format\n/ytmp3 linkyoutube\n Contoh : /ytmp3 https://youtu.be/FXfqLUuVBis";
    client.sendMessage(message.from, content);
    sendingMessage(sender, content);
  } else if (message.body.startsWith("/igdown ")) {
    feedReelDown(message.body.split(" ")[1], client, message, sender);
  } else if (message.body === "/igdown") {
    const content =
      "Untuk mendownload Feed/Reels gunakan format\n/igdown linkfeed\n Contoh : /igdown https://www.instagram.com/p/CrwRhHLv7WV/";
    client.sendMessage(message.from, content);
    sendingMessage(sender, content);
  } else if (message.body.startsWith("/igstories ")) {
    storiesDown(message.body.split(" ")[1], client, message, sender);
  } else if (message.body === "/igstories") {
    const content =
      "Untuk mendownload IG Stories gunakan format\n/igstories username\n Contoh : /igstories oliviarodrigo";
    client.sendMessage(message.from, content);
    sendingMessage(sender, content);
  } else if (message.body.startsWith("/ttdown ")) {
    tiktokDownloader(message.body.split(" ")[1], client, message, sender);
  } else if (message.body.toLowerCase() === "/ttdown") {
    const content =
      "Untuk mendownload Tiktok tanpa Water Mark gunakan format\n/ttdown linktt\n Contoh : /ttdown https://vt.tiktok.com/ZS8TbxWLU/";
    client.sendMessage(message.from, content);
    sendingMessage(sender, content);
  } else if (message.body.startsWith("/spotify ")) {
    SpotifyDownloader(message.body.split(" ")[1], client, message, sender);
  } else if (message.body === "/imgtostkr") {
    if (message.type === "image") {
      const img = await message.downloadMedia();
      client
        .sendMessage(message.from, img, {
          sendMediaAsSticker: true,
          stickerAuthor: "WidBot",
          stickerName: sender,
        })
        .then(() => {
          client.sendMessage(message.from, "Stiker terkirim");
          sendingMessage(sender, "Stiker terkirim");
        });
    } else {
      const content =
        "/imgtostkr harus dibarengi dengan gambar/foto.\nContoh :";
      client.sendMessage(message.from, content).then(() => {
        const media = MessageMedia.fromFilePath(
          path.join(__dirname, "./media/images/exa.jpg")
        );
        client.sendMessage(message.from, media, {
          caption: "/imgtostkr",
        });
        sendingMessage(sender, content);
      });
    }
  } else if (message.body === "/about") {
    const content = [
      "*CHAT BOT WA*\nVersion : V1.0.0 (Stable)\nMaintainer : WidadFjrY\nTester :\n  - Nda \n  @nda.xyz_\n  - Anang AW \n  @aari.wb",
      "Hubungi saya jika ada masukan atau masalah(bug)\nwa.me/6282127264639",
    ];
    client.sendMessage(message.from, content[0]).then(() => {
      client.sendMessage(message.from, content[1]);
    });
    sendingMessage(sender, content);
  } else {
    const content = "Printah tidak dikenali, ketik /notes untuk mebuka catatan";
    message.reply(content);
    sendingMessage(sender, content);
  }
});
