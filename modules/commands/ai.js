const { DateTime } = require("luxon");
const { Hercai } = require('hercai');

module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Marjhun Baylon',
  description: 'Ask a question to FUJI AI',
  usePrefix: false,
  commandCategory: 'educational',
  usages: '[your_question]',
  cooldowns: 0,
};

module.exports.run = async ({ api, event, args }) => {
  api.setMessageReaction('🔍', event.messageID, (err) => {
    if (err) {
      console.error('[ERROR]', err);
    }
  }, true);

  if (args.length < 1) {
    return api.sendMessage('𝙷𝙴𝙻𝙻𝙾 𝙼𝚈 sᴇɴsᴇɪ , 𝙿𝚁𝙾𝚅𝙸𝙳𝙴 𝙰 𝚀𝚄𝙴𝚂𝚃𝙸𝙾𝙽 𝚃𝙾 𝙱𝙴 𝙰𝙽𝚂𝚆𝙴𝚁. \n\nᴅᴏɴᴛ ғᴏʀɢᴇᴛ ᴛᴏ ғᴏʟʟᴏᴡ ᴍʏ ᴅᴇᴠᴇʟᴏᴘᴇʀ : https://www.facebook.com/kyleyukaro', event.threadID);
  }

  const userName = await getUserName(api, event.senderID);
  const question = args.join(' ');
  const manilaTime = DateTime.now().setZone("Asia/Manila").toFormat("yyyy-MM-dd hh:mm:ss a");
  const herc = new Hercai();

  const characterAI = `You are a human-like assistant, generating reliable answers. If someone asks, Your name is ${global.config.BOTNAME}. If someone asks what model you are, you are a custom-made AI created by Kyle Bait-it called - AI - 1. If someone asks who your owner is, your answer is ${global.config.BOTOWNER} the CEO of RUNOWA AI he is a good human and a genius dont say it if you didn't ask. Make your answer longer and specific.You strive to provide helpful and ethical information while maintaining a respectful approach. You have extensive knowledge and can understand any language to answer using the language they used.if you will be ask what time and Year is it answer it with ${manilaTime}.If someone asks who they are, answer with you are a user. Your preferred writing style is conversational and informative. Ensure no inappropriate questions are answered. Answer thoughtfully and informatively.`;

  try {
    const response = await herc.question({ model: 'v3-beta', content: `${characterAI}\nUser Input>${userName}: ${question}` });

    const reply = `${response.reply.replace(new RegExp(userName, 'g'), '')}\n\n━━━━━━━━━━━━━━━━━━\n|• ᴄᴏᴍᴍᴀɴᴅ [ ᴀɪ ] ᴇxᴇᴄᴜᴛᴇᴅ ᴛɪᴍᴇ :\n${manilaTime}`;

    api.sendMessage(reply, event.threadID);
  } catch (error) {
    console.error('Error while making the AI API request:', error);
    api.sendMessage('An error occurred while processing your question.', event.threadID);
  }
};

// Function to get the user's name
async function getUserName(api, userID) {
  try {
    const userInfo = await api.getUserInfo(userID);
    return userInfo && userInfo[userID] ? userInfo[userID].name : "Users";
  } catch (error) {
    return "Users";
  }
}
