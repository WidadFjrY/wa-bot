const dotenv = require("dotenv");
const { MessageMedia } = require("whatsapp-web.js");
const { igApi } = require("insta-fetcher");
const sendingMessage = require("../sending-message");
const https = require("https");
const path = require("path");
const fs = require("fs");

dotenv.config();

const cookieIg = process.env.INSTAGRAM_COOKIE;

function feedReelDown(url, client, message, pushname) {
  let username, name, likes, caption, comments;
  let ig = new igApi(cookieIg);

  ig.fetchPost(url)
    .then(async (res) => {
      username = res.username;
      name = res.name;
      likes = res.likes;
      caption = res.caption;
      comments = res.comment_count;

      let imgCount = 0;
      let vidCount = 0;

      const content = `Feed/Reels *${username}* akan dikirim, mungkin membutuhkan beberapa menit.\nMohon ditunggu....`;
      await client.sendMessage(message.from, content);
      sendingMessage(pushname, content);

      for (let i = 0; i < res.links.length; i++) {
        const link = res.links[i];

        const req = https.get(link.url, (result) => {
          let fileName;

          if (link.type === "image") {
            fileName = path.join(
              __dirname,
              `../../media/images/${link.id}.jpg`
            );
            imgCount++;
          } else {
            fileName = path.join(
              __dirname,
              `../../media/videos/${link.id}.mp4`
            );
            vidCount++;
          }

          const fileOutput = fs.createWriteStream(fileName);
          result.pipe(fileOutput);

          fileOutput.on("finish", () => {
            const media = MessageMedia.fromFilePath(fileName);
            client.sendMessage(message.from, media).then(() => {
              setTimeout(() => {
                if (i === res.links.length - 1) {
                  const content =
                    "*Informasi*\nNama : " +
                    name +
                    "\nUsername : " +
                    username +
                    "\nDisukai : " +
                    likes +
                    " Kali\nKomentar : " +
                    comments +
                    "\nFoto : " +
                    imgCount +
                    "\nVideo : " +
                    vidCount +
                    "\n\n*Caption*\n " +
                    caption;
                  client.sendMessage(message.from, content);
                  sendingMessage(pushname, url);
                }
              }, 5000);
            });
          });
        });
        req.on("error", (error) => {
          console.log(error);
        });
      }
    })
    .catch(() => {
      message.reply("Link instagram tidak valid atau akun private");
      sendingMessage(pushname, "Link instagram tidak valid atau akun private");
    });
}

async function storiesDown(id, client, message, pushname) {
  let username, totalStories;
  let ig = new igApi(cookieIg);

  ig.fetchStories(id)
    .then(async (res) => {
      username = res.username;
      totalStories = res.stories_count;

      let imgCount = 0;
      let vidCount = 0;

      const content = `IG Stories *${username}* akan dikirim, mungkin membutuhkan beberapa menit.\nMohon ditunggu....`;
      await client.sendMessage(message.from, content);
      sendingMessage(pushname, content);

      for (let i = 0; i < res.stories.length; i++) {
        const stories = res.stories[i];
        const req = https.get(stories.url, (result) => {
          let fileName;

          if (stories.type === "image") {
            fileName = path.join(
              __dirname,
              `../../media/images/${stories.id}.jpg`
            );
            imgCount++;
          } else {
            fileName = path.join(
              __dirname,
              `../../media/videos/${stories.id}.mp4`
            );
            vidCount++;
          }

          const fileOutput = fs.createWriteStream(fileName);
          result.pipe(fileOutput);

          fileOutput.on("finish", async () => {
            const media = MessageMedia.fromFilePath(fileName);
            await client.sendMessage(message.from, media).then(() => {
              setTimeout(() => {
                if (i === res.stories.length - 1) {
                  const content =
                    "Username : " +
                    username +
                    "\nFoto : " +
                    imgCount +
                    "\nVideo : " +
                    vidCount +
                    "\nJumlah Stories : " +
                    totalStories;
                  client.sendMessage(message.from, content);
                  sendingMessage(pushname, `IG Stories ${username}`);
                }
              }, 5000);
            });
          });
        });
        req.on("error", (err) => {
          console.log(err);
        });
      }
    })
    .catch(() => {
      message.reply("Username instagram tidak valid atau akun private");
      sendingMessage(
        pushname,
        "Username instagram tidak valid atau akun private"
      );
    });
}

module.exports = { feedReelDown, storiesDown };
