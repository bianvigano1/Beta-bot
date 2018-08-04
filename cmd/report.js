var Discord = require("discord.js");
const mongoose = require("mongoose");
const db = require('quick.db');

  exports.run = async (bot, message, args = []) => {
let mod_case;
    db.fetch(`cases__${message.guild.id}`).then(i => mod_case = i);



    if(args[0] == "help"){
      message.reply("Usage: !report <user> <reason>");
      return;
    }
    
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return errors.cantfindUser(message.channel);
    let rreason = args.join(" ").slice(22);
    if (rUser.id === message.author.id) return errors.sameuser
    if(!rreason) return errors.noReason(message.channel);

 // var rchannelid = await db.fetch(`gulid__${message.guild.id}`, { target: '.report_channel' });
  var nochannelembed = new Discord.MessageEmbed()
  .setTitle("Error")
  .setAuthor(message.author.username, message.author.displayAvatarURL)
  .setDescription("report channel not found")
  .setTimestamp()
  .setColor("#fff")
  if(rchannel == "null") return message.channel.send(nochannelembed)

  message.delete();
  var rchannel = await message.guild.channels.get(rchannelid);

    db.add(`cases__${message.guild.id}`, 1).then(function(i) {


  //`${message.author.username}#${message.author.discriminator}`
    let reportembed = new Discord.MessageEmbed()
    .setDescription(`Report | case #${i}` )
    .setColor("#ff0000")
    .addField("Reported User", `${rUser} with ID: ${rUser.id} | Full name: ${message.mentions.users.first().username}#${message.mentions.users.first().discriminator}`)
   .addField("Reported By", `${message.author} with ID: ${message.author.id} | Full name: ${message.author.username}#${message.author.discriminator}`)
    .addField("Channel", message.channel)
 
   .addField("Reason", rreason);
   let reportschannel = message.guild.channels.find(`name`, "reports");
      if(!reportschannel) return message.channel.send("Couldn't find reports channel.");
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


