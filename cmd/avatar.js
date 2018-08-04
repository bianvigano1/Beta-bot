var Discord = require("discord.js");
  exports.run = async (bot, message, args = []) => {

    let user;
    if (message.mentions.users.size) {
      user = message.mentions.users.first();
    }
    if (!user) {
      user = message.author;
    }
    var avaembed = new Discord.RichEmbed()
      .setTitle(`${user.username}\`s Avatar`)
      .setImage(user.displayAvatarURL)
      .setColor('36393e')
    await message.channel.send(avaembed)




};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["av"],
  permLevel: 0
};

exports.help = {
  name: "avatar",
  description: "shows your / person avatar",
  category: "info",
  usage: " avatar [@user]"
};
