const path = require("path");
const ttdl = require("tiktok-video-downloader");
const https = require("https");
const fs = require("fs");
const sendingMessage = require("../sending-message");
const { MessageMedia } = require("whatsapp-web.js");

function tiktokDownloader(url, client, message, pushname) {
  let author, totalViews, loves, backsound;
  let urlNoWM;
  let fileName;
  let caption;
  let thubnails;
  ttdl
    .getInfo(url)
    .then((result) => {
      author = result.author.name;
      totalViews = result.video.views;
      loves = result.video.loves;
      backsound = result.backsound.name;
      urlNoWM = result.video.url.no_wm;
      thubnails = result.video.thumbnail;

      if (urlNoWM === undefined) {
        fileName = path.join(
          __dirname,
          "../../media/videos/" +
            result.author.name +
            result.video.loves +
            ".jpg"
        );
      } else {
        fileName = path.join(
          __dirname,
          "../../media/videos/" +
            result.author.name +
            result.video.loves +
            ".mp4"
        );
      }
    })
    .then(() => {
      caption =
        "Author : " +
        author +
        "\nTotal View : " +
        totalViews +
        "\nLoves : " +
        loves +
        "\nBacksound : " +
        backsound;
    })
    .then(() => {
      const req = https.get(urlNoWM, (res) => {
        const content = `Video *${author}* akan dikirim, mungkin membutuhkan beberapa menit.\nMohon ditunggu....`;

        client.sendMessage(message.from, content);
        sendingMessage(pushname, content);

        const fileOutput = fs.createWriteStream(fileName);
        res.pipe(fileOutput);

        fileOutput.on("finish", () => {
          const media = MessageMedia.fromFilePath(fileName);
          client
            .sendMessage(message.from, media, {
              caption: caption,
            })
            .then(() => {
              sendingMessage(pushname, url);
            });
        });
      });
      req.on("error", (err) => {
        console.log(err);
        const content = [
          "Link tiktok tidak valid",
          "Foto tiktok downloader & stories downloader akan segera hadir",
        ];
        message.reply(content[0]);
        client.sendMessage(message.from, content[1]);
        sendingMessage(pushname, content);
      });
    });
}

module.exports = tiktokDownloader;
