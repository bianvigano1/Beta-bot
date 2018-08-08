var Discord = require("discord.js");
const dateFormat = require('dateformat');

  exports.run = async (bot, message, args = []) => {

    const millisCreated = new Date().getTime() - message.guild.createdAt.getTime();
    const guildCreated = millisCreated / 1000 / 60 / 60 / 24;
    
//iconURL
//displayAvatarURL
  var embed = new Discord.RichEmbed()
    .setTitle('Server info')
    .setColor('#36393e')
    .setDescription('info about the server.')
    .setFooter('Server info', message.guild.iconURL)
    .setThumbnail(message.guild.iconURL)
    .setTimestamp()
    .addField("Guild info", `Guild Name: ${message.guild.name}\n Guild ID: ${message.guild.id}\nGuild Region: ${message.guild.region}\n Guild Verification Level: ${message.guild.verificationLevel}`, true)
 .addField("Members", `Online members: \`${message.guild.members.filter(m=>m.presence.status == 'online').size}\`\n Idle Members: \`${message.guild.members.filter(m=>m.presence.status == 'idle').size}\`\n DND members: \`${message.guild.members.filter(m=>m.presence.status == 'dnd').size}\` \n offline Members: \`${message.guild.members.filter(m=>m.presence.status == 'offline').size}\`\n Total Members: \`${message.guild.members.size}\``, true)
 .addField("Extra info", `Days Since Creation: \`${guildCreated.toFixed(0)}\`\n Guild Owner: ${message.guild.owner || "None"}\n Large Guild?: ${message.guild.large}\n Number of emojis:\`${message.guild.emojis.size}\``, true)
    .addField("channels", `Text Channels: \`${message.guild.channels.filter(message => message.type === 'text').size}\`\n Voice Channels: \`${message.guild.channels.filter(message => message.type === 'voice').size}\`\n Total channels: \`${message.guild.channels.size}\``, true)
    .addField("Guild Creation Date", message.guild.createdAt, true)
    .addField('Highest Role', message.guild.roles.sort((a, b) => a.position - b.position || a.id - b.id).last().name, true)
    .addField('Roles size', message.guild.roles.size, true)
    .addField("Roles", message.guild.roles.map(roles => `${roles}`).join('  |  '), true)
  
    message.channel.send(embed)
   

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sinfo"],
  permLevel: 0
};

exports.help = {
  name: "serverinfo",
  description: "gives you info about bot",
  category: "info",
  usage: " serverinfo"
};
