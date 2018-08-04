var Discord = require("discord.js");
exports.run = async (bot, message, args, botownerid, ops = []) => {

    var fetched = await ops.active.get(message.guild.id);


    var notinginqembed = new Discord.RichEmbed()
.setTitle("Error")
.setDescription("there isn't any music playing in the guild")
.setTimestamp()

    if(!fetched) return message.channel.send(notinginqembed)


    
    var beinchannembed = new Discord.RichEmbed() 
    .setTitle("Error")
    .setDescription("you must be in same voice channel as me")
    .setTimestamp()
if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(beinchannembed)


var fixurtextmanembed = new Discord.RichEmbed() 
.setTitle("Error")
.setDescription("input number between 1 - 200")
.setTimestamp()

if(isNaN(args[0]) || args > 250 || args[0] < 0) return message.channel.send(fixurtextmanembed)


fetched.dispatcher.setVolume(args[0]/100)


var donemanvolemobed = new Discord.RichEmbed() 
.setTitle("Music")
.setDescription(`Now volume of ${fetched.queue.songTitle} is ${args[0]}`)
.setTimestamp()

message.channel.send(donemanvolemobed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "volume",
  description: "changes volume of playing music",
    category: "music",
  usage: " volume <1 - 250>"
};
