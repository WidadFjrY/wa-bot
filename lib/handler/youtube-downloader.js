const { MessageMedia } = require("whatsapp-web.js");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
const sendingMessage = require("../sending-message");

async function youtubeDownloaderMp4(url, client, message, pushname) {
  const options = {
    filter: "audioandvideo",
  };
  const getVideoId = ytdl.getURLVideoID(url);

  let urlThumbnails, thumbnails;
  let title, duration, author, totalViews;
  let mediaPath;
  let stats;
  let fileSizeInBytes, fileSizeInMegabytes, fileSize;

  if (ytdl.validateURL(url)) {
    ytdl
      .getInfo(url)
      .then((info) => {
        title = info.videoDetails.title.replace(/[\/|]+/g, "-");
        duration = info.videoDetails.lengthSeconds;
        author = info.videoDetails.author.name;
        totalViews = info.videoDetails.viewCount;
      })
      .then(() => {
        const content = `Video *${title}* akan dikirim, mungkin membutuhkan beberapa menit.\nMohon ditunggu....`;

        client.sendMessage(message.from, content);
        sendingMessage(pushname, content);

        mediaPath = path.join(__dirname, `../.././media/videos/${title}.mp4`);
        stats = fs.statSync(mediaPath);
        fileSizeInBytes = stats.size;
        fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
        fileSize = fileSizeInMegabytes.toFixed(2);
        urlThumbnails = `https://i.ytimg.com/vi/${getVideoId}/hqdefault.jpg`;
      })
      .then(() => {
        ytdl(url, options)
          .pipe(fs.createWriteStream(mediaPath))
          .on("finish", async () => {
            const media = MessageMedia.fromFilePath(mediaPath);
            const caption =
              "Judul\t\t\t:\t" +
              title +
              "\nAuthor\t\t:\t" +
              author +
              "\nDurasi\t\t:\t" +
              duration +
              " Detik" +
              "\nDilihat\t\t:\t" +
              totalViews +
              " Kali";

            thumbnails = await MessageMedia.fromUrl(urlThumbnails);

            if (fileSize >= 10) {
              await client.sendMessage(message.from, thumbnails);
              await client.sendMessage(message.from, media, {
                sendMediaAsDocument: true,
                caption: false,
              });
              await client.sendMessage(message.from, caption);
            } else {
              await client.sendMessage(message.from, media, {
                sendMediaAsDocument: false,
                caption: caption,
              });
            }
            sendingMessage(pushname, url);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    message.reply("Link YouTube tidak valid");
  }
}

function youtubeDownloaderMp3(url, client, message, messageFrom) {
  let title, author, duration;
  let urlThumbnails;
  let thumbnails;
  let mediaPath;
  let getVideoId = ytdl.getURLVideoID(url);
  const options = {
    filter: "audioonly",
  };

  if (ytdl.validateURL(url)) {
    ytdl
      .getInfo(url)
      .then((info) => {
        title = info.videoDetails.title.replace(/[\/|]+/g, "-");
        author = info.videoDetails.author.name;
        duration = info.videoDetails.lengthSeconds;
        urlThumbnails = `https://i.ytimg.com/vi/${getVideoId}/hqdefault.jpg`;
      })
      .then(async () => {
        client.sendMessage(
          message.from,
          `Musik *${title}* akan dikirim, mungkin membutuhkan beberapa menit.\nMohon ditunggu....`
        );
        mediaPath = path.join(__dirname, `../../media/music/${title}.mp3`);

        thumbnails = await MessageMedia.fromUrl(urlThumbnails);
      })
      .then(() => {
        ytdl(url, options)
          .pipe(fs.createWriteStream(mediaPath))
          .on("finish", async () => {
            await client
              .sendMessage(message.from, thumbnails)
              .then(async () => {
                const media = MessageMedia.fromFilePath(mediaPath);
                await client
                  .sendMessage(message.from, media, {
                    sendMediaAsDocument: true,
                    caption: false,
                  })
                  .then(() => {
                    const caption =
                      "Judul\t\t\t:\t" +
                      title +
                      "\nAuthor\t\t:\t" +
                      author +
                      "\nDurasi\t\t:\t" +
                      duration +
                      " Detik";

                    client.sendMessage(message.from, caption);
                    sendingMessage(messageFrom, url);
                  });
              });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    message.reply("Link YouTube tidak valid");
  }
}

module.exports = { youtubeDownloaderMp4, youtubeDownloaderMp3 };
