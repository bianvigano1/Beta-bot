var Discord = require("discord.js");
exports.run = async (bot, message, args, botownerid, ops = []) => {

    var notinginqembed = new Discord.RichEmbed()
    .setTitle("Error")
    .setDescription("there isn't any music playing in the guild")
    .setTimestamp()
    
        let fetched = ops.active.get(message.guild.id);
    
          if(!fetched) return message.channel.send(notinginqembed)

          var beinchannembed = new Discord.RichEmbed() 
          .setTitle("Error")
          .setDescription("you must be in same voice channel as me")
          .setTimestamp()
      if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(beinchannembed)

 var passeddudeembed = new Discord.RichEmbed()
 .setTitle("Error")
          .setDescription("music is't pasued")
          .setTimestamp()
if(!fetched.dispatcher.paused) return message.channel.send(passeddudeembed)


fetched.dispatcher.resume();

var donedudechill = new Discord.RichEmbed()
.setTitle("Music")
         .setDescription(`rresumed: **${fetched.queue[0].songTitle}**`)
         .setTimestamp()
message.channel.send(donedudechill)

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "resume",
  description: "resume music",
    category: "music",
  usage: " resume"
};
