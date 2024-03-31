const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'owner',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Kyle Bait-it',
  usePrefix: false,
  description: 'Display bot owner information',
  commandCategory: 'system',
  usages: '',
  cooldowns: 0
};

module.exports.run = async ({ api, event }) => {
  try {
    const ownerInfo = {
      name: `${global.config.BOTOWNER}`,
      gender: 'MALE',
      age: '19',
      height: 'secret',
      facebookLink: `${global.config.OWNERLINK}`,
      status: 'have a girlfriend rn.'
    };

    const videoUrl =  
'https://drive.google.com/uc?export=download&id=1q2XoDFwQHReCQzevsZyGI2ZrXQlOxQ6l'; // Replace with your Google Drive videoid link https://drive.google.com/uc?export=download&id=here put your video id

    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    const response = `
⚜️ 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡 📜\n━━━━━━━━━━━━
  NAME: ${ownerInfo.name}\n
  GENDER: ${ownerInfo.gender}\n
AGE: ${ownerInfo.age}\n
HEIGHT: ${ownerInfo.height}\n
FACEBOOK: ${ownerInfo.facebookLink}\n
STATUS: ${ownerInfo.status}\n━━━━━━━━━━━━`;


    await api.sendMessage({
      body: response,
      attachment: fs.createReadStream(videoPath)
    }, event.threadID, event.messageID);

    if (event.body.toLowerCase().includes('ownerinfo')) {
      api.setMessageReaction('😳', event.messageID, (err) => {}, true);
    }
  } catch (error) {
    console.error('Error in ownerinfo command:', error);
    return api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
};
