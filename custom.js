module.exports = async ({ api }) => {
  const logger = require('./utils/log');
  const cron = require('node-cron');
  const fs = require('fs');
  const yandeva = {
    autoRestart: {
      status: true,
      time: 40, //40 minutes
      note: 'To avoid problems, enable periodic bot restarts'
    },
    accpetPending: {
      status: false,
      time: 10, //10 minutes
      note: 'Approve waiting messages after a certain time'
    }
  }
  function autoRestart(config) {
    if (config.status) {
      setInterval(async () => {
        logger(`Start rebooting the system!`, "[ Auto Restart ]")
        process.exit(1)
      }, config.time * 60 * 1000)
    }
  }
  function accpetPending(config) {
    if (config.status) {
      setInterval(async () => {
        const list = [
          ...(await api.getThreadList(1, null, ['PENDING'])),
          ...(await api.getThreadList(1, null, ['OTHER']))
        ];
        if (list[0]) {
          api.sendMessage('You have been approved for the queue. (This is an automated message)', list[0].threadID);
        }
      }, config.time * 60 * 1000)
    }
  }
  autoRestart(yandeva.autoRestart)
  accpetPending(yandeva.accpetPending)

  cron.schedule('*/30 * * * *', () => {
    api.getThreadList(25, null, ['INBOX'], async (err, data) => {
      if (err) return console.error("Error [Thread List Cron]: " + err);
      let i = 0;
      let j = 0;

      async function message(thread) {
        try {
          api.sendMessage(`› Thanks for using my bot!\n${global.config.OWNERLINK}`, thread.threadID, (err) => { if (err) return });
        } catch (error) {
          console.error("Error sending a message:", error);
        }
      }

      while (j < 20 && i < data.length) {
        if (data[i].isGroup && data[i].name != data[i].threadID) {
          await message(data[i]);
          j++;
        }
        i++;
      }
    });
  }, {
    scheduled: false,
    timezone: "Asia/Manila"
  });

  cron.schedule('*/120 * * * *', () => {
    api.getThreadList(25, null, ['INBOX'], async (err, data) => {
      if (err) return console.error("Error [Thread List Cron]: " + err);
      let i = 0;
      let j = 0;

      async function message(thread) {
        try {
          api.sendMessage(`𝙷𝙴𝙻𝙻𝙾 𝙸'𝙼 𝚁𝚄𝙽𝙾𝚆𝙰 𝙰𝙸 𝙲𝚁𝙴𝙰𝚃𝙴𝙳 𝙱𝚈 𝙺𝚈𝙻𝙴 𝙱𝙰𝙸𝚃-𝙸𝚃\n━━━━━━━━━━━━━━━━\n
ᴛʏᴘᴇ:

ʜᴇʟᴘ-ᴛᴏ sᴇᴇ ᴛʜᴇ ᴄᴏᴍᴍᴀɴᴅ ʟɪsᴛ
ᴄᴀʟʟᴀᴅ-ᴛᴀʟᴋ ᴡɪᴛʜ ᴀᴅᴍɪɴs ᴀɴᴅ ᴅᴇᴠᴇʟᴏᴘᴇʀ

ᴛʜɪs ɪs ᴀᴜᴛᴏᴍᴀᴛᴇᴅ ᴄʜᴀᴛ ᴇᴠᴇʀʏ 2 ʜᴏᴜʀ's
\n━━━━━━━━━━━━━━━━━\n
ᴠɪsɪᴛ ᴍʏ ᴅᴇᴠᴇʟᴏᴘᴇʀ ғʙ : https://www.facebook.com/kyleyukaro`, thread.threadID, (err) => { if (err) return });
        } catch (error) {
          console.error("Error sending a message:", error);
        }
      }

      while (j < 20 && i < data.length) {
        if (data[i].isGroup && data[i].name != data[i].threadID) {
          await message(data[i]);
          j++;
        }
        i++;
      }
    });
  }, {
    scheduled: false,
    timezone: "Asia/Manila"
  });
};
