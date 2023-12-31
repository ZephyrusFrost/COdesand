const axios = require("axios");
const { createReadStream, unlinkSync } = require("fs");
const { resolve } = require("path");

module.exports.config = {
  name: "sendnoti",
  version: "1.1.0",
  hasPermssion: 2,
  credits: "𝙼𝙰𝚁𝙹𝙷𝚄𝙽 𝙱𝙰𝚈𝙻𝙾𝙽",
  description: "Sends a message to all groups and can only be done by the admin.",
  usePrefix: false,
  commandCategory: "message",
  usages: "[Text]",
  cooldowns: 0,
};


module.exports.run = async function ({ api, event, args }) {

  if ((this.config.credits) != "𝙼𝙰𝚁𝙹𝙷𝚄𝙽 𝙱𝙰𝚈𝙻𝙾𝙽") { return api.sendMessage(`[ 𝗔𝗡𝗧𝗜 𝗖𝗛𝗔𝗡𝗚𝗘 𝗖𝗥𝗘𝗗𝗜𝗧𝗦 ]
𝗔𝗗𝗠𝗜𝗡 𝗠𝗘𝗦𝗦𝗔𝗚𝗘: 
ᴄʜᴀɴɢᴇ ᴄʀᴇᴅɪᴛs ᴘᴀ ᴀᴋᴏ sᴀʏᴏ ᴍᴀɢ ᴘʀᴀᴄᴛɪᴄᴇ ᴋᴀ😝 
𝗠𝗘𝗠𝗕𝗘𝗥 𝗠𝗘𝗦𝗦𝗔𝗚𝗘:
𝚃𝚑𝚒𝚜 𝚋𝚘𝚝 𝚌𝚛𝚎𝚊𝚝𝚘𝚛 𝚒𝚜 𝚊 𝚌𝚑𝚊𝚗𝚐𝚎 𝚌𝚛𝚎𝚍𝚒𝚝𝚘𝚛 𝚔𝚊𝚢𝚊 𝚋𝚎 𝚊𝚠𝚊𝚛𝚎 𝚗𝚎𝚡𝚝 𝚝𝚒𝚖𝚎.

𝗢𝗪𝗡𝗘𝗥 𝗢𝗙 𝗧𝗛𝗜𝗦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗: 
https://www.facebook.com/zcoded221

`, event.threadID, event.messageID)}

  const threadList = await api.getThreadList(25, null, ["INBOX"]);
  let sentCount = 0;
  const custom = args.join(" ");

  async function sendMessage(thread) {
    try {
      await api.sendMessage(
        `𝙉𝙊𝙏𝙄𝘾𝙀 𝙁𝙍𝙊𝙈 𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍
𝗡𝗼𝘁𝗶𝗰𝗲: ${custom}\n\n𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥 : ${global.config.BOTOWNER}`,
        thread.threadID
      );
      sentCount++;

      const content =`${custom}`;
      const languageToSay = "tl"; 
      const pathFemale = resolve(__dirname, "cache", `${thread.threadID}_female.mp3`);


      await global.utils.downloadFile(
        `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
          content
        )}&tl=${languageToSay}&client=tw-ob&idx=1`,
        pathFemale
      );
      api.sendMessage(
        { attachment: createReadStream(pathFemale) },
        thread.threadID,
        () => unlinkSync(pathFemale)
      );
    } catch (error) {
      console.error("Error sending a message:", error);
    }
  }

  for (const thread of threadList) {
    if (sentCount >= 20) {
      break;
    }
    if (thread.isGroup && thread.name != thread.threadID && thread.threadID != event.threadID) {
      await sendMessage(thread);
    }
  }

  if (sentCount > 0) {
    api.sendMessage(`› sᴇɴᴛ ᴛʜᴇ ɴᴏᴛɪғɪᴄᴀᴛɪᴏɴ sᴜᴄᴄᴇssғᴜʟʟʏ.`, event.threadID);
  } else {
    api.sendMessage(
      "› No eligible group threads found to send the message to.",
      event.threadID
    );
  }
};