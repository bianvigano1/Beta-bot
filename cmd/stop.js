var Discord = require("discord.js");
  exports.run = async (bot, message, args = []) => {

      if(!message.member.voiceChannel) return message.channel.send("Not in voice channel :/")

      if(!message.guild.me.voiceChannel) return message.channel.send("i didn't join :/")

      if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send(" not same channel :/")


message.guild.me.voiceChannel.leave();
var stopcmdembed = new Discord.RichEmbed()
    .setTitle('Music')
    .setDescription("Left the channel")  
    .setColor('36393e')
message.channel.send(stopcmdembed)


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "stop",
  description: "stops the playing music",
  category: "music",
  usage: " stop"
};
