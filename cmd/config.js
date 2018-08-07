var Discord = require("discord.js");
const db = require('quick.db');
const fs = require("fs");

  exports.run = async (bot, message, args = []) => {
    
    var missingpermebed = new Discord.RichEmbed()
    .setDescription("<:modError:468064170257154069> Only server admin can use this command")
    .setColor("36393e")
    if((message.member.hasPermission("MANAGE_GUILD")) || (message.author.id == "191615236363649025")) {
    
      switch (args[0]) {

      
case "welcome-channel":
var welchannel = await db.fetch(`gulid__${message.guild.id}`, { target: '.welcome' });
if(welchannel == "null")
var welargs = args.join(" ").slice(16);
if(message.mentions.channels.first()) {
  await db.set(`gulid__${message.guild.id}`, message.mentions.channels.first().id, { target: '.welcome' });
  var setwelembed = new Discord.RichEmbed()
  .setTitle("Welcome channel")
  .setDescription("<:Moddone:468059684478255104> Done. now welcome channel is now " + message.mentions.channels.first())
  .setTimestamp()
  .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
  message.channel.send(setwelembed)
} else if (welargs == "reset") {
  await db.set(`gulid__${message.guild.id}`, "null", { target: '.welcome' });
  var setwelembed = new Discord.RichEmbed()
  .setTitle("Welcome channel")
  .setDescription("<:Moddone:468059684478255104> Done. now welcome channel is reseten ")
  .setTimestamp()
  .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
} else {
  var notingdwembed = new Discord.RichEmbed()
  .setTitle(`<:user:468562311666466817> Welcome channel is ${welchannel == "null" ?  "Not set" : message.guild.channels.get(welchannel)}`)
  .setDescription(" please metion channel or type \"reset\"")
  .setColor("36393e")
  .setTimestamp()
  .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)  
  message.channel.send(notingdwembed)
}
break;

case "welcome-enable":

var welenargs = args.join(" ").slice(15);
var welenable = await db.fetch(`gulid__${message.guild.id}`, { target: '.welcome_enable' });

if((welenargs == "on") || (welenargs == "off")) {

if (welenargs == "on") {

  var ifonmanembed = new Discord.RichEmbed()
  .setDescription("<:cross:468412380057960448> welcome is enabled already")
  .setColor("36393e")
  .setTimestamp()
.setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
  if(welenable == true) return message.channel.send(ifonmanembed)
  await db.set(`gulid__${message.guild.id}`, true, { target: '.welcome_enable' });
  var embed = new Discord.RichEmbed()
  .setColor("36393e")
  .setDescription("<:user:468562311666466817> Now welcomeing is disabled")
  .setTimestamp()
.setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
  message.channel.send(embed)
} else if (welenargs == "off") {

  var ifonmanembed = new Discord.RichEmbed()
  .setDescription("<:cross:468412380057960448> welcome is disabled already")
  .setColor("36393e")
  .setTimestamp()
.setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
  if(welenable == false) return message.channel.send(ifonmanembed)
  await db.set(`gulid__${message.guild.id}`, false, { target: '.welcome_enable' });
  var resenwelenembed = new Discord.RichEmbed()

  .setColor("36393e")
  .setDescription("<:user:468562311666466817> Now welcomeing is disabled")
  .setTimestamp()
.setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
  message.channel.send(resenwelenembed)
}

} else if (welenargs == "reset") {
  await db.set(`gulid__${message.guild.id}`, false, { target: '.welcome_enable' });
var resenwelenembed = new Discord.RichEmbed()
.setColor("36393e")
.setDescription("<:user:468562311666466817> Now welcomeing is reseten [disabled]")
.setTimestamp()
.setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
message.channel.send(resenwelenembed)

} else {
var wecome_enable = new Discord.RichEmbed()
.setTitle(`Welcomeing is ${welenable ? "enabled" : "disabled"}`)
.setDescription(`type \"reset\" or "on" or "off"`)
.setColor("36393e")
.setTimestamp()
.setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
message.channel.send(wecome_enable)
}


break;


case "mod-logs": 
let modargs = args.join(" ").slice(9);
if(message.mentions.channels.first()) {
var mod_channel_s = await db.fetch(`gulid__${message.guild.id}`, { target: '.mod_logs' });
var isenabledmod = await db.fetch(`gulid__${message.guild.id}`, { target: '.mod_logs_enabled' });

await db.set(`gulid__${message.guild.id}`, message.mentions.channels.first().id, { target: '.mod_logs' });
var setwelembed = new Discord.RichEmbed()
.setTitle("mod logs channel")
.setDescription("<:Moddone:468059684478255104> Done. now mod logs channel is now " + message.mentions.channels.first())
.setTimestamp()
.setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
message.channel.send(setwelembed)

} else if (modargs == "reset") {

  await db.set(`gulid__${message.guild.id}`, "null", { target: '.mod_logs' });
  var setwelembed = new Discord.RichEmbed()
  .setTitle("mod logs channel")
  .setDescription("<:Moddone:468059684478255104> Done. now mod logs channel is reseten ")
  .setTimestamp()
  .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
} else {
  var mod_channel_sss = await db.fetch(`gulid__${message.guild.id}`, { target: '.mod_logs' });

  var embed = new Discord.RichEmbed()
  .setTitle(`Mod log channel [${isenabledmod ? "Enbled" : "Disabled"}]`)
  .setDescription(`Mod log channel is: ${mod_channel_sss == "null" ?  "Not set" : message.guild.channels.get(mod_channel_sss)}`)
  .setTimestamp()
.setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
  message.channel.send(embed)
}

break;

case "report-channel":
var report_channel_s = await db.fetch(`gulid__${message.guild.id}`, { target: '.report_channel' });
let reportargs = args.join(" ").slice(14);
if(message.mentions.channels.first()) {

  await db.set(`gulid__${message.guild.id}`, message.mentions.channels.first().id, { target: '.report_channel' });
  var setwelembed = new Discord.RichEmbed()
  .setTitle("Report channel")
  .setDescription("<:Moddone:468059684478255104> Done. now report channel is now " + message.mentions.channels.first())
  .setTimestamp()
  .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
  message.channel.send(setwelembed)


} else if (reportargs == "reset") {

  await db.set(`gulid__${message.guild.id}`, "null", { target: '.report_channel' });
  var setwelembed = new Discord.RichEmbed()
  .setTitle("Report channel")
  .setDescription("<:Moddone:468059684478255104> Done. now Report channel is reseten ")
  .setTimestamp()
  .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)

  message.channel.send(setwelembed)

} else {

  var embed = new Discord.RichEmbed()
  .setTitle(`Report channel`)
  .setDescription(`report channel is: ${report_channel_s == "null" ?  "Not set" : message.guild.channels.get(report_channel_s)}`)
  .setTimestamp()
.setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
  message.channel.send(embed)

}


break;




case "mod-logs-enable": 
var enabled_mod_args = args.join(" ").slice(16);

if (enabled_mod_args) { 

if (enabled_mod_args == "on" || enabled_mod_args == "off") {

  if (enabled_mod_args == "on") await db.set(`gulid__${message.guild.id}`, true, { target: '.mod_logs_enabled' });
  if (enabled_mod_args == "off") await db.set(`gulid__${message.guild.id}`, false, { target: '.mod_logs_enabled' });

  var isEnabled = await db.fetch(`gulid__${message.guild.id}`, { target: '.mod_logs_enabled' });

var embed = new Discord.RichEmbed()

.setAuthor(message.author.username, message.author.displayAvatarURL)
.setDescription(`\nNow mod logs are ${isEnabled ? "Enabled" : "Disabled"}\n `)
.setFooter("Beta", bot.user.displayAvatarURL)
.setTimestamp()

message.channel.send(embed)


} else if (enabled_mod_args == "reset") {

  await db.set(`gulid__${message.guild.id}`, false, { target: '.mod_logs_enabled' });

  var embed = new Discord.RichEmbed()

  .setAuthor(message.author.username, message.author.displayAvatarURL)
  .setDescription(`\nNow mod logs are Disabled\n `)
  .setFooter("Beta", bot.user.displayAvatarURL)
  .setTimestamp()
  
  message.channel.send(embed)


 } else if (!enabled_mod_args == "reset" || !enabled_mod_args == "on" || !penabled_mod_args == "off") {

  var embed = new Discord.RichEmbed()

  .setAuthor(message.author.username, message.author.displayAvatarURL)
  .setDescription(`\n Invalid input \n Use "reset" to reset it "on" to enable it  "off" to disable it`)
  .setFooter("Beta", bot.user.displayAvatarURL)
  .setTimestamp()


 }



} else {

  var embed = new Discord.RichEmbed()

  .setAuthor(message.author.username, message.author.displayAvatarURL)
  .setDescription(`\n Invalid input \n Use "reset" to reset it "on" to enable it  "off" to disable it`)
  .setFooter("Beta", bot.user.displayAvatarURL)
  .setTimestamp()


}


break;

case "reset":

await db.delete(`gulid__${message.guild.id}`)
await db.delete(`cases__${message.guild.id}`)



db.set(`gulid__${message.guild.id}`, { prefix: "//", welcome: "null", welcome_enable: false, mod_logs: "null", report_channel: "null", mod_logs_enabled: false})
db.set(`cases__${message.guild.id}`, 0);
break;


default:

var settings = await db.fetch(`gulid__${message.guild.id}`);
var welcome_emoji = settings.welcome_enable ? "<:toggleON:468559199467470869>" : "<:toggleOFF:468559199467733002>";
var mod_emoji = settings.mod_logs_enabled ? "<:toggleON:468559199467470869>" : "<:toggleOFF:468559199467733002>";

var settings_embed = new Discord.RichEmbed()
.setTitle("<:cogwheel:468412272742760458> Server settings")
.setThumbnail(message.guild.iconURL)
.setColor("36393e")
.setDescription("do //config <settings name> <value>")
.addField("   <:report:468566310666895361> report-channel", settings.report_channel == "null" ?  "Not set" : message.guild.channels.get(settings.report_channel), true)
.addField(`<:user:468562311666466817> welcome-channel [${settings.welcome_enable ? "Enabled" : "Disabled"}]`, settings.welcome == "null" ?  "Not set" : message.guild.channels.get(settings.welcome), true)
.addField(`${welcome_emoji} welcome-enable`, settings.welcome_enable ? "ON" : "OFF", true)
.addField(`<:Mod:468410309607030804> mod-logs [${settings.mod_logs_enabled ? "Enabled" : "Disabled"}]`, settings.mod_logs == "null" ?  "Not set" : message.guild.channels.get(settings.mod_logs), true)
.addField(`${mod_emoji} mod-logs-enable`, settings.mod_logs_enabled ? "ON" : "OFF", true)
.setTimestamp()
.setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)

message.channel.send(settings_embed)
      }

    } else return message.channel.send(missingpermebed)

    





};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "config",
  description: "changes bot configuration in server",
  category: "administration",
  usage: " config <setting> <value>"
};
