var Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require('os');
const osu = require('os-utils');
const cpuStat = require("cpu-stat")
  exports.run = async (bot, message, args = []) => {

       
         let uptime = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
          
          var humemory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
          var rssmemory = (process.memoryUsage().rss / 1024 / 1024).toFixed(2)
          var htmemory = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)
          var exmemory = (process.memoryUsage().external / 1024 / 1024).toFixed(2)
          var totalmem = Math.round(os.totalmem() / 1000000);  
       
      const statsembed = new Discord.RichEmbed()
      .setAuthor(bot.user.username, bot.user.displayAvatarURL)
     // .setTitle(`${bot.user.username}\`s Status`)
      .setThumbnail(bot.user.displayAvatarURL)
    .addField("general info", `Bot name: ${bot.user.username}\nBot ID: 450812379681390594`, true)
    .addField("Bot creator", `Username: yossaf#7001\n ID: 191615236363649025`, true)
    /*
      .addField("Bot name", bot.user.username, true)
      .addField("Bot ID", bot.user.id, true)
      .addField("Bot creator ", "yossaf#7001", true)
      .addField("Bot creator ID", "191615236363649025", true)
      */
      .addField('Memory Usage:',`Rss: ${rssmemory} MB \n heapUsed: ${rssmemory} MB \n heapTotal: ${htmemory} MB \n external: ${exmemory} MB \n Total memory: ${totalmem} MB`, true)
      .addField(`Bot info`, `servers in: ${bot.guilds.size} \n Users: ${bot.users.size} \n Channels in: ${bot.channels.size}\n Uptime: ${uptime}`, true)
      .addField("librarys", `Coding language: Javascript \n Discord.js Version: 11.3.2 \n Node.js Version ${process.version}`, true)
      .addField("support & invite bot", `[support server](https://discord.gg/Z8BADer) \n [invite me](https://discordapp.com/oauth2/authorize/?permissions=2146958591&scope=bot&client_id=450812379681390594)`, true)
    
      .setTimestamp()  
      .setColor("36393e")
      message.channel.send({embed: statsembed})
      
    
    
        

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["info"],
  permLevel: 0
};

exports.help = {
  name: "stats",
  description: "gives you information about bot",
  category: "info",
  usage: " stats"
};
