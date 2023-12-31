module.exports.config = {
  name: "appstate",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Marjhun Baylon",
  description: "Refresh Appstate.json",
  usePrefix: false,
  commandCategory: "admin",
  usages: "[refappstate]",
  cooldowns: 5,
  dependencies: {
  }
};

module.exports.run = async function ({ api, event, args }) {
  const fs = require("fs-extra");
  const permission = [`100085656551427`];
  if (!permission.includes(event.senderID)) return api.sendMessage("⚠️ | 𝗦𝗲𝗻𝘀𝗲𝗶, 𝘆𝗼𝘂 𝗱𝗼𝗻'𝘁 𝗵𝗮𝘃𝗲 𝗮𝗻𝘆 𝗽𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻 𝘁𝗼 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱! \n"+global.config.OWNER+" 𝖮𝗇𝗅𝗒 𝖼𝖺𝗇 𝗎𝗌𝖾 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.", event.threadID, event.messageID);
  let appstate = api.getAppState();
  // convert JSON object to a string
  const data = JSON.stringify(appstate);
  // write file to disk
  fs.writeFile(`${__dirname}/../../appstate.json`, data, 'utf8', (err) => {
    if (err) {
      return api.sendMessage(`❎ | 𝖦𝗈𝗆𝖾𝗇 𝗆𝖺𝗌𝗍𝖾𝗋, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗐𝗋𝗂𝗍𝗂𝗇𝗀 𝗍𝗁𝖾 𝖿𝗂𝗅𝖾: ${err}`, event.threadID);
    } else {
      return api.sendMessage(`✅ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗋𝖾𝖿𝗋𝖾𝗌𝗁𝖾𝖽 𝖺𝗉𝗉𝗌𝗍𝖺𝗍𝖾 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒.`, event.threadID);
    }
  });

}