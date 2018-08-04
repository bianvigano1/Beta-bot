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

let usercount = message.member.voiceChannel.members.size;

let require = Math.ceil(usercount/2);

if(!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

var votedman = new Discord.RichEmbed()
.setTitle("Error")
.setDescription(`you already voted | ${fetched.queue[0].voteSkips.length}/${require} required`)
.setTimestamp()

if(fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(votedman)

fetched.queue[0].voteSkips.push(message.member.id);

ops.active.set(message.guild.id, fetched)

if(fetched.queue[0].voteSkips.length >= require) {
    var skipsongembed = new Discord.RichEmbed()
    .setTitle("Music")
    .setDescription(`Skiped song`)
    .setTimestamp()
message.channel.send(skipsongembed)

return fetched.dispatcher.emit("end");

}
var votedembed = new Discord.RichEmbed()
.setTitle("Music")
.setDescription(`Added your vote | ${fetched.queue[0].voteSkips.length}/${require} required to skip song`)
.setTimestamp()
message.channel.send(votedembed)


var notinginqembed = new Discord.RichEmbed()
.setTitle("Error")
.setDescription("there isn't any music playing in the guild")
.setTimestamp()


 

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "skip",
  description: "skips playing song",
  category: "music",
  usage: " skip"
};
