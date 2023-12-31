module.exports.config = {
  name: "callad",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Marjhun Baylon",
  description: "Report bot's error to admin or comment",
  usePrefix: false,
  commandCategory: "group",
  usages: "[Error encountered or comments]",
  cooldowns: 5
}, module.exports.handleReply = async function({
  api: e,
  args: n,
  event: a,
  Users: s,
  handleReply: o
}) {
  var i = await s.getNameUser(a.senderID);
  switch (o.type) {
    case "reply":
      var t = global.config.ADMINBOT;
      for (let n of t) e.sendMessage({
        body: "📄 | 𝗙𝗲𝗲𝗱𝗯𝗮𝗰𝗸 𝗳𝗿𝗼𝗺 " + i + ":\n" + a.body,
        mentions: [{
          id: a.senderID,
          tag: i
        }]
      }, n, ((e, n) => global.client.handleReply.push({
        name: this.config.name,
        messageID: n.messageID,
        messID: a.messageID,
        author: a.senderID,
        id: a.threadID,
        type: "calladmin"
      })));
      break;
    case "calladmin":
      e.sendMessage({
        body: `📄 | 𝗙𝗲𝗲𝗱𝗯𝗮𝗰𝗸 𝗳𝗿𝗼𝗺 𝗺𝗮𝘀𝘁𝗲𝗿: ${i}\n╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n${a.body}\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n💬 | 𝖪𝗂𝗇𝖽𝗅𝗒 𝗋𝖾𝗉𝗅𝗒 𝗍𝗈 𝗍𝗁𝗂𝗌 𝗆𝖾𝗌𝗌𝖺𝗀𝖾 𝗍𝗈 𝖼𝗈𝗇𝗍𝗂𝗇𝗎𝖾 𝗌𝖾𝗇𝖽𝗂𝗇𝗀 𝗋𝖾𝗉𝗈𝗋𝗍𝗌 𝗍𝗈 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋\n\n❖❂⟬𝗙.𝗨.𝗝.𝗜⟭ 𝗔𝗜❂❖`,
        mentions: [{
          tag: i,
          id: a.senderID
        }]
      }, o.id, ((e, n) => global.client.handleReply.push({
        name: this.config.name,
        author: a.senderID,
        messageID: n.messageID,
        type: "reply"
      })), o.messID)
  }
}, module.exports.run = async function({
  api: e,
  event: n,
  args: a,
  Users: s,
  Threads: o
}) {
  if (!a[0]) return e.sendMessage("ℹ️ | 𝖸𝗈𝗎 𝗁𝖺𝗏𝖾 𝗇𝗈𝗍 𝖾𝗇𝗍𝖾𝗋𝖾𝖽 𝗍𝗁𝖾 𝖼𝗈𝗇𝗍𝖾𝗇𝗍 𝗍𝗈 𝗋𝖾𝗉𝗈𝗋𝗍 𝗍𝗈 𝗆𝖺𝗌𝗍𝖾𝗋", n.threadID, n.messageID);
  let i = await s.getNameUser(n.senderID);
  var t = n.senderID,
    d = n.threadID;
  let r = (await o.getData(n.threadID)).threadInfo;
  var l = require("moment-timezone").tz("Asia/Manila").format("HH:mm:ss D/MM/YYYY");
  e.sendMessage(`✅ | ${l}\n𝖸𝗈𝗎𝗋 𝗋𝖾𝗉𝗈𝗋𝗍 𝗁𝖺𝗌 𝖻𝖾𝖾𝗇 𝗌𝖾𝗇𝗍 𝗍𝗈 𝗆𝗒 𝗆𝖺𝗌𝗍𝖾𝗋`, n.threadID, (() => {
    var s = global.config.ADMINBOT;
    for (let o of s) {
      let s = r.threadName;
      e.sendMessage(`╭┉┉┅┉┅┄┄•◦ೋ•◦❥•◦ೋ\n❖❂⟬𝗙.𝗨.𝗝.𝗜⟭ 𝗔𝗜❂❖\n•◦ೋ•◦❥•◦ೋ•┈┄┄┅┉┅┉╯\n👤 | 𝗥𝗲𝗽𝗼𝗿𝘁 𝗳𝗿𝗼𝗺: ${i}\n👨‍👩‍👧‍👧 | 𝗕𝗼𝘅: ${s}\n🔰 | 𝗜𝗗 𝗕𝗼𝘅: ${d}\n🔷 | 𝗜𝗗 𝗨𝘀𝗲: ${t}\n\n⚠️ | 𝗘𝗿𝗿𝗼𝗿: ${a.join(" ")}\n\n🕓 | 𝗧𝗶𝗺𝗲: ${l}`, o, ((e, a) => global.client.handleReply.push({
        name: this.config.name,
        messageID: a.messageID,
        author: n.senderID,
        messID: n.messageID,
        id: d,
        type: "calladmin"
      })))
    }
  }))
};