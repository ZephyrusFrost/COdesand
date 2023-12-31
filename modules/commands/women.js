const fs = require("fs");
module.exports.config = {
  name: "women",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Marjhun Baylon", 
  description: "no prefix needed in this command lol",
  usePrefix: false,
commandCategory: "noprefix",
  usages: "[just say women,Women, or girls]",
    cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("babae")==0 || (event.body.indexOf("girls")==0 || (event.body.indexOf("women")==0 || (event.body.indexOf("Women")==0)))) {
    var msg = {
        body: "☕☕ 𝘄𝗼𝗺𝗲𝗻 ☕☕",
        attachment: fs.createReadStream(__dirname + `/noprefix/women.mp4`)
      }
      api.sendMessage(msg, threadID, messageID);
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

}
