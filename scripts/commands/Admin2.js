const moment = require("moment-timezone");
const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "Admin",
  version: "1.0.0",
  permission: 0,
  credits: "Joy",
  description: "Shows admin's personal information",
  prefix: true,
  category: "info",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": ""
  }
};

module.exports.run = async function ({ api, event }) {
  const currentTime = moment.tz("Asia/Dhaka").format("DD MMM YYYY, hh:mm:ss A");
  const imageUrl = "https://graph.facebook.com/100001435123762/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
  const imgPath = __dirname + "/cache/admin_avatar.png";

  const infoText = `
╭╼|━━━━━━━━━━━━━━|╾╮
👑 𝗔𝗱𝗺𝗶𝗻: MD SUMON ISLAM
🌐 𝗡𝗮𝗺𝗲: SUMON_BOT
🕋 𝗥𝗲𝗹𝗶𝗴𝗶𝗼𝗻: ISLAM | 🚹 𝗚𝗲𝗻𝗱𝗲𝗿: MALE
🎂 𝗔𝗴𝗲: 17+ | 🎓 𝗪𝗼𝗿𝗸: STUDENT
🏠 𝗙𝗿𝗼𝗺: ASHULIYA DHAKA
📍 𝗖𝘂𝗿𝗿𝗲𝗻𝘁: ASHULIYA
💘 𝗦𝘁𝗮𝘁𝘂𝘀: SIMGEL
📧 𝗘𝗺𝗮𝗶𝗹: mdsumonislam89@gmail.com
📞 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽: +8801975257710
✈️ 𝗧𝗲𝗹𝗲𝗴𝗿𝗮𝗺: t.me/SUMON_KIMG
🔗 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸:  SUMON জা্ঁন্স্ঁ
⏰ 𝗧𝗶𝗺𝗲: ${currentTime}
╰╼|━━━━━━━━━━━━━━|╾╯`;

  const callback = () => {
    api.sendMessage({
      body: infoText,
      attachment: fs.createReadStream(imgPath)
    }, event.threadID, () => fs.unlinkSync(imgPath));
  };

  request(encodeURI(imageUrl))
    .pipe(fs.createWriteStream(imgPath))
    .on("close", callback);
};
