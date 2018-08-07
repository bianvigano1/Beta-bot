var Discord = require("discord.js");
const db = require('quick.db');

  exports.run = async (bot, message, args = []) => {



    if(args[0] == "help"){
      message.reply("Usage: //report <user> <reason>");
      return;
    }
    
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return errors.cantfindUser(message.channel);
    let rreason = args.join(" ").slice(22);
    if (rUser.id === message.author.id) return errors.sameuser
    if(!rreason) return errors.noReason(message.channel);

  var rchannelid = await db.fetch(`gulid__${message.guild.id}`, { target: '.report_channel' });
  var rchannel = await message.guild.channels.get(rchannelid);
  var nochannelembed = new Discord.MessageEmbed()
  .setTitle("Error")
  .setAuthor(message.author.username, message.author.displayAvatarURL)
  .setDescription("report channel not found")
  .setTimestamp()
  if(!rchannel) return message.channel.send(nochannelembed)


    db.add(`cases__${message.guild.id}`, 1).then(function(i) {


  //`${message.author.username}#${message.author.discriminator}`
    let reportembed = new Discord.MessageEmbed()
    .setDescription(`Report | case #${i}` )
    .setColor("#ff0000")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`, true)
   .addField("Reported By", `${message.author} with ID: ${message.author.id}`, true)
    .addField("Channel", message.channel, true)
 
   .addField("Reason", rreason);
      message.delete().catch(O_o=>{});
      rchannel.send(reportembed);
      });

};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "report",
  description: "reports a user | needs reports channel",
  category: "administration",
  usage: "report <user> <reson>"
};


