module.exports.config = {
  name: "quiz",
  version: "1.0.0",
  credits: "Marjhun Baylon",
  hasPermssion: 0,
  description: "Answer questions (English)",
  usePrefix: false,
  commandCategory: "quiz",
  usages: "[quiz]",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
};

module.exports.handleReaction = ({ api, event, handleReaction }) => {
  if (!event.userID == handleReaction.author) return;
  let response = "";
  if (event.reaction == "👍") response = "True"
  else response = "False";
  if (response == handleReaction.answer) api.sendMessage("🎉 | 𝖢𝗈𝗇𝗀𝗋𝖺𝗍𝗎𝗅𝖺𝗍𝗂𝗈𝗇𝗌 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗀𝗈𝗍 𝗍𝗁𝖾 𝖺𝗇𝗌𝗐𝖾𝗋 𝗋𝗂𝗀𝗁𝗍!", event.threadID);
  else api.sendMessage("👾 | 𝖦𝗈𝗆𝖾𝗇 𝗌𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝗀𝗈𝗍 𝗍𝗁𝖾 𝖺𝗇𝗌𝗐𝖾𝗋 𝗐𝗋𝗈𝗇𝗀, 𝖻𝖾𝗍𝗍𝖾𝗋 𝗅𝗎𝖼𝗄 𝗇𝖾𝗑𝗍 𝗍𝗂𝗆𝖾!", event.threadID);
  const indexOfHandle = client.handleReaction.findIndex(e => e.messageID == handleReaction.messageID);
  global.client.handleReaction.splice(indexOfHandle, 1);
  handleReaction.answerYet = 1;
  return global.client.handleReaction.push(handleReaction);
}

module.exports.run = async ({  api, event, args }) => {
  const axios = global.nodemodule["axios"];
  let difficulties = ["easy", "medium", "hard"];
  let difficulty = args[0];
  (difficulties.some(item => difficulty == item)) ? "" : difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  let fetch = await axios(`https://opentdb.com/api.php?amount=1&encode=url3986&type=boolean&difficulty=${difficulty}`);
  if (!fetch.data) return api.sendMessage("❎ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝖨 𝖼𝖺𝗇'𝗍 𝖿𝗂𝗇𝖽 𝗍𝗁𝖾 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇 𝖻𝖾𝖼𝖺𝗎𝗌𝖾 𝗍𝗁𝖾 𝗌𝖾𝗋𝗏𝖾𝗋 𝗂𝗌 𝖻𝗎𝗌𝗒", event.threadID, event.messageID);
  return api.sendMessage(`📖 | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗁𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇 𝖿𝗈𝗋 𝗒𝗈𝗎:\n ${decodeURIComponent(fetch.data.results[0].question)}\n\n   👍: 𝖳𝗋𝗎𝖾       😢: 𝖥𝖺𝗅𝗌𝖾`, event.threadID, async (err, info) => {
    global.client.handleReaction.push({
      name: "quiz",
      messageID: info.messageID,
      author: event.senderID,
      answer: fetch.data.results[0].correct_answer,
      answerYet: 0
    });
    await new Promise(resolve => setTimeout(resolve, 20 * 1000));
    const indexOfHandle = global.client.handleReaction.findIndex(e => e.messageID == info.messageID);
    let data = global.client.handleReaction[indexOfHandle];
    if (data.answerYet !== 1) {
      api.sendMessage(`⏱️ | 𝖳𝗂𝗆𝖾 𝗈𝗎𝗍!! 𝖳𝗁𝖾 𝖼𝗈𝗋𝗋𝖾𝖼𝗍 𝖺𝗇𝗌𝗐𝖾𝗋 𝗂𝗌 ${fetch.data.results[0].correct_answer}`, event.threadID, info.messageID);
      return global.client.handleReaction.splice(indexOfHandle, 1);
    }
    else return;
  });
}