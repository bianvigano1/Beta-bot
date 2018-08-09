var Discord = require("discord.js");
const hastebin = require('hastebin-gen');
  exports.run = async (bot, message, args = []) => {

      



    message.channel.startTyping();
    let haste = message.content.split(" ").slice(1).join(" ")
    let type = haste[0]
    if (!haste[0]) { 
        return console.log('err');
    }
    await hastebin(haste, "txt").then(r => {
        message.channel.send(new Discord.RichEmbed()
        .setTitle("Hastebin")
            .setDescription(`<:check:459949561096437770> Posted text to Hastebin at this [URL](${r})`)
            .setColor('36393e')
        );
    }).catch(console.error);
    message.channel.stopTyping();



};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["haste"],
  permLevel: 0
};

exports.help = {
  name: "hastebin",
  description: "hastes bin you input",
  category: "fun",
  usage: "hastebin <input>"
};
