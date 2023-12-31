module.exports.config = {
  name: "weather",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Marjhun Baylon",
  description: "See weather information in the area",
  usePrefix: false,
  commandCategory: "information",
  usages: "[Location]",
  cooldowns: 5,
  dependencies: {
    "moment-timezone": "",
    "request": ""
  },
  envConfig: {
    "OPEN_WEATHER": "b7f1db5959a1f5b2a079912b03f0cd96"
  }
};

module.exports.languages = {

  "en": {
    "locationNotExist": "sᴇɴsᴇɪ, ɪ ᴄᴀɴ'ᴛ ғɪɴᴅ ᴛʜᴇ ʟᴏᴄᴀᴛɪᴏɴ %1 ʏᴏᴜ ᴘʀᴏᴠɪᴅᴇᴅ.",
    "returnResult": "\n🌡️ | 𝗧𝗲𝗺𝗽𝗲𝗿𝗮𝘁𝘂𝗿𝗲: %1℃\n🌡 | 𝗙𝗲𝗲𝗹𝘀 𝗹𝗶𝗸𝗲: %2℃\n☁️ | 𝗦𝗸𝘆: %3\n🌦 | 𝗛𝘂𝗺𝗶𝗱𝗶𝘁𝘆: %4%\n💨 | 𝗪𝗶𝗻𝗱 𝘀𝗽𝗲𝗲𝗱: %5𝗄𝗆/𝗁\n🌅 | 𝗦𝘂𝗻 𝗿𝗶𝘀𝗲𝘀: %6\n🌄 | 𝗦𝘂𝗻 𝘀𝗲𝘁𝘀: %7\n•"
  }
}

module.exports.run = async ({ api, event, args, getText }) => {
  const request = global.nodemodule["request"];
  const moment = global.nodemodule["moment-timezone"];
  const { throwError } = global.utils;
  const { threadID, messageID } = event;

  var city = args.join(" ");
  if (city.length == 0) return throwError(this.config.name, threadID, messageID);
  return request(encodeURI("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + global.configModule[this.config.name].OPEN_WEATHER + "&units=metric&lang=" + global.config.language), (err, response, body) => {
    if (err) throw err;
    var weatherData = JSON.parse(body);
    if (weatherData.cod !== 200) return api.sendMessage(getText("locationNotExist", city), threadID, messageID);
    var sunrise_date = moment.unix(weatherData.sys.sunrise).tz("Asia/Ho_Chi_Minh");
    var sunset_date = moment.unix(weatherData.sys.sunset).tz("Asia/Ho_Chi_Minh");
    api.sendMessage({
      body: getText("returnResult", weatherData.main.temp, weatherData.main.feels_like, weatherData.weather[0].description, weatherData.main.humidity, weatherData.wind.speed, sunrise_date.format('HH:mm:ss'), sunset_date.format('HH:mm:ss')),
      location: {
        latitude: weatherData.coord.lat,
        longitude: weatherData.coord.lon,
        current: true
      },
    }, threadID, messageID);
  });
}