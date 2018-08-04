var Discord = require("discord.js");
const ms = require("ms");
  exports.run = async (bot, message, args = []) => {

    if(message.member.hasPermission("MANAGE_SERVER")) {

    if (!bot.lockit) bot.lockit = [];
  
    let time = args.join(' ')
    let validUnlocks = ['release', 'unlock'];
    var notimeembed = new Discord.MessageEmbed()
    .setTitle('Error')
    .setDescription("<:error:454318141938597899> You must set a duration for the lockdown in either hours, minutes or seconds")  
    .setColor('36393e')
    if (!time) return message.send(notimeembed);

    if (validUnlocks.includes(time)) {
      message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: null
      }).then(() => {
        var liftedembed = new Discord.MessageEmbed()
        .setTitle('<:padunlock:453624572051456000> Lockdown')
        .setDescription("loockdown lifted.")  
        .setColor('36393e')
        message.channel.send(liftedembed);
        clearTimeout(bot.lockit[message.channel.id]);
        delete bot.lockit[message.channel.id];
      }).catch(error => {
        console.log(error);
      });
    } else {
      message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      }).then(() => {
        var lockdownembed = new Discord.MessageEmbed()
        .setTitle("<:padlock:453624546591768597> Channel Locked")
        .addField("Locked by", `${message.author}`, true)
        .addField("Locked for", `${ms(ms(time), { long:true })}`, true)
        .setColor('36393e')
        message.channel.send(lockdownembed).then(() => {

          bot.lockit[message.channel.id] = setTimeout(() => {
            var liftedembed = new Discord.MessageEmbed()
            .setTitle('<:padunlock:453624572051456000> Lockdown')
            .setDescription(" loockdown lifted.")  
            .setColor('36393e') 
            message.channel.overwritePermissions(message.guild.id, {
              SEND_MESSAGES: null
            }).then( 
               
              message.channel.send(liftedembed)).catch(console.error);
            delete bot.lockit[message.channel.id];
          }, ms(time));

        }).catch(error => {
          console.log(error);
        });
      });
    }

    } else {
        var nopermsembed = new Discord.MessageEmbed()
        .setTitle('Error')
        .setDescription("<:error:454318141938597899> Missing Permissions :: MANAGE_SERVER")  
        .setColor('36393e')
        message.channel.send(nopermsembed)
    }




};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "lockdown",
  description: "locks the channel down",
  category: "administration",
  usage: " lockdown <time>"
};
