module.exports.config = {
  name: "cache",
  version: "1.0.1",
  hasPermssion: 2,
  credits: "Marjhun Baylon",
  description: "Delete file or folder in cache folder",
  usePrefix: false,
  commandCategory: "system",
  usages: "\ncache start <text>\ncache ext <text>\ncache <text>\ncache [blank]\ncache help\nNOTE: <text> is the character you enter as you like",
  cooldowns: 5
};

module.exports.handleReply = ({ api, event, args, handleReply }) => {
  if(event.senderID != handleReply.author) return; 
  const fs = require("fs-extra");
  var arrnum = event.body.split(" ");
  var msg = "";
  var nums = arrnum.map(n => parseInt(n));

  for(let num of nums) {
    var target = handleReply.files[num-1];
    var fileOrdir = fs.statSync(__dirname+'/cache/'+target);
      if(fileOrdir.isDirectory() == true) {
        var typef = "《 𝗙𝗼𝗹𝗱𝗲𝗿 🗂️ 》";
        fs.rmdirSync(__dirname+'/cache/'+target, {recursive: true});
      }
      else if(fileOrdir.isFile() == true) {
        var typef = "《 𝗙𝗶𝗹𝗲 📄 》";
        fs.unlinkSync(__dirname+"/cache/"+target);
      }
      msg += typef+' '+handleReply.files[num-1]+"\n";
  }
  api.sendMessage("🚮 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗌𝗎𝖼𝖼𝖾𝗌𝗌𝖿𝗎𝗅𝗅𝗒 𝖽𝖾𝗅𝖾𝗍𝖾𝖽 𝗍𝗁𝖾 𝖿𝗈𝗅𝗅𝗈𝗐𝗂𝗇𝗀 𝖿𝗂𝗅𝖾𝗌 𝗂𝗇 𝗍𝗁𝖾 𝖼𝖺𝖼𝗁𝖾 𝖿𝗈𝗅𝖽𝖾𝗋:\n\n"+msg, event.threadID, event.messageID);
}


module.exports.run = async function({ api, event, args, Threads }) {

  const fs = require("fs-extra");
  const permission = ["100085656551427"];
    if (!permission.includes(event.senderID)) return api.sendMessage("⚠️ | 𝖲𝖾𝗇𝗌𝖾𝗂, 𝗒𝗈𝗎 𝖽𝗈𝗇'𝗍 𝗁𝖺𝗏𝖾 𝗉𝖾𝗋𝗆𝗂𝗌𝗌𝗂𝗈𝗇 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽", event.threadID, event.messageID);
  var files = fs.readdirSync(__dirname+"/cache") || [];
  var msg = "", i = 1;

//

  if(args[0] == 'help') {
      //❎do not edit author name❎
  var msg = `
  ⫸ᴍᴏᴅᴜʟᴇ ᴄᴏᴅᴇ ʙʏ ᴍᴀʀᴊʜᴜɴ ʙᴀʏʟᴏɴ⫷
ʜᴏᴡ ᴛᴏ ᴜsᴇ ᴄᴏᴍᴍᴀɴᴅs:
•ᴋᴇʏ: sᴛᴀʀᴛ <ᴛᴇxᴛ>
•ᴇғғᴇᴄᴛs: ғɪʟᴛᴇʀɪɴɢ ᴛʜᴇ ғɪʟᴇ ᴛᴏ ᴅᴇʟᴇᴛᴇ ᴛʜᴇ ᴏᴘᴛɪᴏɴᴀʟ ᴄʜᴀʀᴀᴄᴛᴇʀ
•ᴇɢ: ᴄᴀᴄʜᴇ ʀᴀɴᴋ
•ᴋᴇʏ: ᴇxᴛ <ᴛᴇxᴛ>
•ᴇғғᴇᴄᴛ: ғɪʟᴛᴇʀ ᴏᴜᴛ ғɪʟᴇ ᴛᴏ ᴅᴇʟᴇᴛᴇ ᴏᴘᴛɪᴏɴs
•ᴇɢ: ᴄᴀᴄʜᴇ ᴘɴɢ
•ᴋᴇʏ: <ᴛᴇxᴛ>
•ᴇғғᴇᴄᴛ: ғɪʟᴛᴇʀ ᴏᴜᴛ ғɪʟᴇs ɪɴ ᴛʜᴇ ɴᴀᴍᴇ ᴡɪᴛʜ ᴄᴜsᴛᴏᴍ ᴛᴇxᴛ
•ᴇɢ: ᴄᴀᴄʜᴇ ᴀ
•ᴋᴇʏ: ʙʟᴀɴᴋ
•ᴇғғᴇᴄᴛs: ғɪʟᴛᴇʀ ᴀʟʟ ғɪʟᴇs ɪɴ ᴄᴀᴄʜᴇ
•ᴇxᴀᴍᴘʟᴇ: ᴄᴀᴄʜᴇ
•ᴋᴇʏ: ʜᴇʟᴘ
•ᴇғғᴇᴄᴛ: sᴇᴇ ʜᴏᴡ ᴛᴏ ᴜsᴇ ᴄᴏᴍᴍᴀɴᴅs
•ᴇxᴀᴍᴘʟᴇ: ᴄᴀᴄʜᴇ ʜᴇʟᴘ`;

  return api.sendMessage(msg, event.threadID, event.messageID);
  }
  else if(args[0] == "start" && args[1]) {
    var word = args.slice(1).join(" ");
    var files = files.filter(file => file.startsWith(word));

    if(files.length == 0) return api.sendMessage(`🔍 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 𝗇𝗈 𝖿𝗂𝗅𝖾𝗌 𝗂𝗇 𝗍𝗁𝖾 𝖼𝖺𝖼𝗁𝖾 𝗍𝗁𝖺𝗍 𝖻𝖾𝗀𝗂𝗇 𝗐𝗂𝗍𝗁 《${word}》`, event.threadID ,event. messageID);
    var key = `🔍 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 《${files.length}》 𝖿𝗂𝗅𝖾 𝗍𝗁𝖺𝗍 𝗁𝖺𝗌 𝖺 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋 𝗍𝗁𝖺𝗍 𝗌𝗍𝖺𝗋𝗍𝗌 𝗐𝗂𝗍𝗁 《${word}》`;
  }

  //The file extension is..... 
  else if(args[0] == "ext" && args[1]) {
    var ext = args[1];
    var files = files.filter(file => file.endsWith(ext));

    if(files.length == 0) return api.sendMessage(`❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 𝗇𝗈 𝖿𝗂𝗅𝖾𝗌 𝗂𝗇 𝗍𝗁𝖾 𝖼𝖺𝖼𝗁𝖾 𝗐𝗂𝗍𝗁 𝖺 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋 𝖾𝗇𝖽𝗂𝗇𝗀 𝗂𝗇 《${ext}》`, event.threadID ,event. messageID);
    var key = `🔍 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 《${files.length}》 𝖿𝗂𝗅𝖾𝗌 𝗍𝗁𝖺𝗍 𝗁𝖺𝗌 𝖺 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋 𝗍𝗁𝖺𝗍 𝗌𝗍𝖺𝗋𝗍𝗌 𝗐𝗂𝗍𝗁 《${ext}》`;
  }
  //all file
  else if (!args[0]) {
  if(files.length == 0) return api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗒𝗈𝗎𝗋 𝖼𝖺𝖼𝗁𝖾 𝗁𝖺𝗌 𝗇𝗈 𝖿𝗂𝗅𝖾𝗌 𝗈𝗋 𝖿𝗈𝗅𝖽𝖾𝗋𝗌", event.threadID ,event. messageID);
  var key = "🔍 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝖺𝗅𝗅 𝖿𝗂𝗅𝖾𝗌 𝗂𝗇 𝖼𝖺𝖼𝗁𝖾 𝖽𝗂𝗋𝖾𝖼𝗍𝗈𝗋𝗒:";
  }
  //trong tên có ký tự.....
  else {
    var word = args.slice(0).join(" ");
    var files = files.filter(file => file.includes(word));
    if(files.length == 0) return api.sendMessage(`❎ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 𝗇𝗈 𝖿𝗂𝗅𝖾𝗌 𝗂𝗇 𝗍𝗁𝖾 𝗇𝖺𝗆𝖾 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋 《${word}》`, event.threadID ,event. messageID);
    var key = `🔍 | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗍𝗁𝖾𝗋𝖾 𝖺𝗋𝖾 《${files.length}》 𝖿𝗂𝗅𝖾 𝗂𝗇 𝗍𝗁𝖾 𝗇𝖺𝗆𝖾 𝗍𝗁𝖺𝗍 𝗁𝖺𝗌 𝗍𝗁𝖾 𝖼𝗁𝖺𝗋𝖺𝖼𝗍𝖾𝗋 《${word}》`;
  }

    files.forEach(file => {
      var fileOrdir = fs.statSync(__dirname+'/cache/'+file);
      if(fileOrdir.isDirectory() == true) var typef = "《 𝗙𝗼𝗹𝗱𝗲𝗿 🗂️ 》";
      if(fileOrdir.isFile() == true) var typef = "《 𝗙𝗶𝗹𝗲 📄 》";
      msg += (i++)+'. '+typef+' '+file+'\n';
    });

     api.sendMessage(`ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗄𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝖻𝗒 𝗇𝗎𝗆𝖻𝖾𝗋 𝗍𝗈 𝖽𝖾𝗅𝖾𝗍𝖾 𝗍𝗁𝖾 𝖼𝗈𝗋𝗋𝖾𝗌𝗉𝗈𝗇𝖽𝗂𝗇𝗀 𝖿𝗂𝗅𝖾, 𝖼𝖺𝗇 𝗋𝖾𝗉𝖾𝖺𝗍 𝗆𝗎𝗅𝗍𝗂𝗉𝗅𝖾 𝗇𝗎𝗆𝖻𝖾𝗋𝗌, 𝗌𝖾𝗉𝖺𝗋𝖺𝗍𝖾𝖽 𝖻𝗒 𝗌𝗉𝖺𝖼𝖾.\n${key}\n\n`+msg, event.threadID, (e, info) => global.client.handleReply.push({
    name: this.config.name,
    messageID: info.messageID,
    author: event.senderID,
    files
  }))

}