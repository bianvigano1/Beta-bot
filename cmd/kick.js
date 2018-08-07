var Discord = require("discord.js");
const db = require('quick.db');
  exports.run = async (bot, message, args = []) => {

      
var noperms = new Discord.RichEmbed()
.setDescription("<:modError:468064170257154069> Missing permission \"KICK_MEMBERS\"")
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(noperms)

    var noinput = new Discord.RichEmbed()
    .setDescription("<:modError:468064170257154069> Usage: kick <User> <Reason>")

    if (!args[0]) return message.channel.send(noinput).then(msg => msg.delete(9500));
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    var notFoundEmbed = new Discord.RichEmbed()
    .setDescription("<:modError:468064170257154069> User not found")
    if(!bUser) return message.channel.send(notFoundEmbed).then(msg => msg.delete(9500));
    var bReason = args.join(' ').slice(22)
    var adminis = new Discord.RichEmbed()
    .setDescription("<:modError:468064170257154069> I can't kick that user")
    if(bUser.hasPermission("KICK_MEMBERS")) return message.channel.send(adminis)
message.delete().catch(O_o=>{});
  message.guild.member(bUser).kick(bReason);
  var dembed = new Discord.RichEmbed()
  .setDescription("<:Moddone:468059684478255104> Kicked " + bUser.user.tag + " Form server")
  message.channel.send(dembed).then(msg => msg.delete(5500));
  db.add(`cases__${message.guild.id}`, 1).then( async function(i) {
  var isEnabled = await db.fetch(`gulid__${message.guild.id}`, { target: '.mod_logs_enabled' });
  if (isEnabled == false) return; 
  var modlogschan = await db.fetch(`gulid__${message.guild.id}`, { target: '.mod_logs' });
  var modlog = await message.guild.channels.get(modlogschan);
  if (!modlog) return;


  var banembed = new Discord.RichEmbed()
.setTitle(`<:Mod:468410309607030804> Kick | case: #${i}`)
.setDescription(`Kicked the user ${bUser.user.tag}`)
.addField("UserID", bUser.id, true)
.addField("Reason:", bReason, true)
.addField("Kicked By:", message.author.tag, true)
.setThumbnail(bUser.user.displayAvatarURL)
.setFooter(`Kicked by ID: ${message.author.id}`, message.author.displayAvatarURL) 
modlog.send(banembed)

  });





};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "kick",
  description: " kicks user out of guild",
  category: "administration",
  usage: " kick <user> <reason>"
};
