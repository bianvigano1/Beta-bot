var Discord = require("discord.js");
  exports.run = async (bot, message, args = []) => {

      

    if(message.guild.emojis.size === 0) {
        var noemojisemeb = new Discord.RichEmbed()
        .setTitle('Error')
        .setDescription("<:error:454318141938597899> This server has no custom emojis!")  
        .setColor('36393e')
        message.channel.send(noemojisemeb)
        return;
      }
      let emojis =  message.guild.emojis.map(e => e.toString())
      var emojisembed = new Discord.RichEmbed()
      .setAuthor(bot.user.username, bot.user.avatarURL)
      .setTitle(`All ${emojis.length} custom emojis on ${message.guild.name}:`)
      .setDescription(`${emojis.join(" ")}`)
      message.channel.send(emojisembed)





};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "emojis",
  description: "list all emojis in server ",
  category: "info",
  usage: " emojis"
};
