module.exports.config = {
  name: "sequence",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Marjhun Baylon",
  description: "Solve arithmetic, geometric, and Fibonacci sequences",
  commandCategory: "math",
  usePrefix: false,
  usages: "[category] [a1] [n] [d/r]",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

  const getUserInfo = async (api, userID) => {
    try {
      const userInfo = await api.getUserInfo(userID);
      return userInfo[userID].name;
    } catch (error) {
      console.error(`Error fetching user info: ${error}`);
      return "";
    }
  };

  const userName = await getUserInfo(api, senderID);

  if (args.length !== 4) {
    const availableCategories = "🌟 | 𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗜𝗘𝗦:\n   ⓵ 𝖠𝗋𝗂𝗍𝗁𝗆𝖾𝗍𝗂𝖼\n   ⓶ 𝖦𝖾𝗈𝗆𝖾𝗍𝗋𝗂𝖼\n   ➂ 𝖥𝗂𝖻𝗈𝗇𝖺𝖼𝖼𝗂\n";
    const correctUsage = `🎓 | 𝗨𝗦𝗔𝗚𝗘:\n𝖳𝗁𝖾 𝖼𝗈𝗋𝗋𝖾𝖼𝗍 𝗎𝗌𝖺𝗀𝖾 𝗂𝗌: ${global.config.PREFIX}𝖲𝖾𝗊𝗎𝖾𝗇𝖼𝖾 [𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗒] [𝖺𝟣] [𝗇] [𝖽/𝗋]`;
    api.sendMessage(`${availableCategories}\n${correctUsage}`, threadID, messageID);
    return;
  }

  const sequenceType = args[0].toLowerCase();
  const a1 = parseFloat(args[1]);
  const n = parseFloat(args[2]);
  const dr = parseFloat(args[3]);

  if (isNaN(a1) || isNaN(n) || isNaN(dr)) {
    api.sendMessage(`ℹ️ | ${userName}, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗏𝖺𝗅𝗂𝖽 𝗇𝗎𝗆𝖾𝗋𝗂𝖼 𝗂𝗇𝗉𝗎𝗍𝗌.`, threadID, messageID);
    return;
  }

  let result = null;

  if (sequenceType === "arithmetic") {
    const d = dr;
    result = a1 + (n - 1) * d;
  } else if (sequenceType === "geometric") {
    const r = dr;
    result = a1 * Math.pow(r, n - 1);
  } else if (sequenceType === "fibonacci") {
    result = calculateFibonacciTerm(n);
  } else {
    const availableCategories = "🌟 | 𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗜𝗘𝗦\n\n   ⓵ 𝖠𝗋𝗂𝗍𝗁𝗆𝖾𝗍𝗂𝖼\n   ⓶ 𝖦𝖾𝗈𝗆𝖾𝗍𝗋𝗂𝖼\n   ➂ 𝖥𝗂𝖻𝗈𝗇𝖺𝖼𝖼𝗂";
    api.sendMessage(`❎ | 𝖳𝗁𝖺𝗍 𝗂𝗌 𝗎𝗇𝗌𝗎𝗉𝗉𝗈𝗋𝗍𝖾𝖽 𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗒. ${availableCategories}`, threadID, messageID);
    return;
  }

  const message = `🔢 | 𝗦𝗘𝗤𝗨𝗘𝗡𝗖𝗘 𝗦𝗢𝗟𝗩𝗘𝗥\n\n${userName}, 𝗍𝗁𝖾 ${n}-𝗍𝗁 𝗍𝖾𝗋𝗆 𝗈𝖿 𝗍𝗁𝖾 ${sequenceType} 𝗌𝖾𝗊𝗎𝖾𝗇𝖼𝖾 𝗂𝗌: ${result}`;

  api.sendMessage(message, threadID, messageID);
};

function calculateFibonacciTerm(n) {
  if (n === 1 || n === 2) {
    return 1;
  }

  let fibPrev = 1;
  let fibCurr = 1;

  for (let i = 3; i <= n; i++) {
    const fibNext = fibPrev + fibCurr;
    fibPrev = fibCurr;
    fibCurr = fibNext;
  }

  return fibCurr;
  }
