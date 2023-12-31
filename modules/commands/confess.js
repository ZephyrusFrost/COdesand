module.exports.config = {
	name: "confess",
	version: "1.0.7",
	hasPermssion: 0,
	credits: "Marjhun Baylon ",
	description: "confessmsg [uid] [text]",
	usePrefix: false,
  commandCategory: "confess",
	usages: "ID [Text]",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
 //if (!args[0]) return api.sendMessage(`${api.getthreadID()}`, event.threadID);
    
	var idbox = args[0];
    var reason = args.slice(1);
	//let threadID = await api.getThreadID();
	if (args.length == 0) api.sendMessage("Please Provide A Valid Format\nFor Example\n\n.confess [UID Of Your Crush] [Your Message Confess] ", event.threadID, event.messageID);
	
	else if(reason == "")api.sendMessage("Syntax error, use: sendmsg ID_BOX [message]", event.threadID, event.messageID);
	
	else
		api.sendMessage("𝗙𝗿𝗼𝗺 𝗬𝗼𝘂𝗿 𝗔𝗱𝗺𝗶𝗿𝗲𝗿: \n\n" + reason.join(" "), idbox, () =>
			api.sendMessage(`${api.getCurrentUserID()}`, () =>
				api.sendMessage("Sent message: " + reason.join(" "), event.threadID)));
  }
  