var Discord = require("discord.js");
exports.run = async (bot, message, args, botownerid, ops = []) => {
var notinginqembed = new Discord.RichEmbed()
.setTitle("Error")
.setDescription("there isn't any music playing in the guild")
.setTimestamp()

    let fetched = ops.active.get(message.guild.id);

      if(!fetched) return message.channel.send(notinginqembed)

let queue = fetched.queue;

let nowplaying = queue[0];

let resp = ``;

for (var i = 1;  i < queue.length; i++) {
  resp += `${i}. **${queue[i].songTitle}** -- **requested by:** *${queue[i].requester}*\n`
}

resp += `\n\n **-----------------------------**\n`

 resp += `__**Now playing:**__\n**${nowplaying.songTitle}** -- **requested by:** *${nowplaying.requester}*`


var queuelistman = new Discord.RichEmbed() 
.setTitle("queue")
.setDescription(resp)
.setTimestamp()

message.channel.send(queuelistman)

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "queue",
  description: "view songs queue ",
  category: "music",
  usage: " queue"
};
