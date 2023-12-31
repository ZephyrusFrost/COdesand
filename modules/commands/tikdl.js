module.exports.config = {
  name: "tikdl",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Marjhun Baylon",
  description: "Download TikTok videos",
  commandCategory: "tikvideo",
  usage: `${global.config.PREFIX}tikdl <link>`,
  usePrefix: false,
  cooldowns: 5,
};

const axios = require("axios");
const fs = require("fs");
const path = require("path");


module.exports.run = async function({ api, event, args }) {
  try {
  const link = args[0];
  if (!link) {
  api.sendMessage("Usage: /tikdl <link>", event.threadID);
  return;
  }
  api.sendMessage(`downloading...`, event.threadID);

  const response = await axios.get(`https://tik-dl-api.diciper09.repl.co/tiktokdl?url=${encodeURIComponent(link)}`);

  const videoUrl = response.data.data.play;
  const userName = response.data.data.author.unique_id;

  if (!videoUrl) {
  api.sendMessage("No video found for the given link.", event.threadID);
  return;
  }

  const videoResponse = await axios({
  method: "get",
  url: videoUrl,
  responseType: "stream",
  });

  const filePath = path.join(__dirname, "cache", "tiktok_video.mp4");
  videoResponse.data.pipe(fs.createWriteStream(filePath));

  videoResponse.data.on("end", () => {
  api.sendMessage(
    {
    attachment: fs.createReadStream(filePath),
    body: `Downloaded Successfully.\nUsername: @${userName}`,
    },
    event.threadID,
    () => fs.unlinkSync(filePath)
  );
  });
  } catch (error) {
  console.error("Error:", error);
  api.sendMessage("An error occurred while processing the request.", event.threadID);
  }
};