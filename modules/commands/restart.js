module.exports.config = {
	name: "res",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Kyle Bait-it",
	description: "Restart Bot",
  usePrefix: false,
	commandCategory: "system",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;
	return api.sendMessage(` ━━━━━━━━━━━━━━━━━━━\n♻️ ${global.config.BOTNAME}ʙᴏᴛ ᴡɪʟʟ ʀᴇsᴛᴀʀᴛ ᴛʜᴇsᴇ ᴡɪʟʟ ᴛᴀᴋᴇ ғᴇᴡ ᴍɪɴᴜᴛᴇs/sᴇᴄᴏɴᴅs\n ━━━━━━━━━━━━━━━━━━━`, threadID, () => process.exit(1));
}
