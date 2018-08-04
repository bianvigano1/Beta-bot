var Discord = require("discord.js");
  exports.run = async (bot, message, args = []) => {

      


    const embed = new Discord.MessageEmbed()
    .setColor('36393e')
    .addField('Name', message.channel.type === 'dm' ? `@${message.channel.recipient.username}` : message.channel.name, true)
    .addField('ID', message.channel.id, true)
    .addField('NSFW ?', message.channel.nsfw ? 'Yes' : 'No', true)
    .addField('Category', message.channel.parent ? message.channel.parent.name : 'None', true)
    .addField('Type', message.channel.type, true)
    .addField('Creation Date', message.channel.createdAt.toDateString(), true)
    .addField('Topic', message.channel.topic || 'None');


message.channel.send(embed)


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["cinfo"],
  permLevel: 0
};

exports.help = {
  name: "channelinfo",
  description: "gives you info about channel",
  category: "info",
  usage: "channelinfo"
};
