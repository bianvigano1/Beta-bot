var Discord = require("discord.js");
const dateFormat = require('dateformat');






  exports.run = async (bot, message, args = []) => {

    
    var num = 0;
      

let useruser = (message.mentions.users.first() || message.author)




let member = message.guild.member(useruser);
if (!member) {
  message.channel.send('That member could not be found!')
  return;
  }


var user = member || useruser;

const millisCreated = new Date().getTime() - useruser.createdAt.getTime();
const daysCreated = millisCreated / 1000 / 60 / 60 / 24;

const millisJoined = new Date().getTime() - useruser.joinedAt.getTime();
const daysJoined = millisJoined / 1000 / 60 / 60 / 24;

let rolopes = user.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role.name);
if (rolopes.length < 1) rolopes = ['None'];
let emboped = new Discord.RichEmbed()
.setTitle('User Infomation')
.setColor('36393e')
.setThumbnail(useruser.displayAvatarURL)
.setDescription(`Infomation about the ${user.user.username}.`)
.setTimestamp()
.setURL('https://discord.js.org/#/docs/main/indev/class/RichEmbed')
.addField('User name', user.user.username + "#" + user.user.discriminator, true)
.addField('User ID ', user.id, true)
.addField('Last Message', user.lastMessage, true) 
.addField('Last Message ID', user.lastMessageID, true) 
.addField('Created On ',  dateFormat(user.createdAt), true)
.addField('Days Since Creation ',  daysCreated.toFixed(0), true)
.addField('Joined On ',  dateFormat(user.joinedAt), true)
.addField('Days Since Joining ',  daysJoined.toFixed(0), true)
.addField('status ',  user.presence.status[0].toUpperCase() + user.presence.status.slice(1), true)
.addField("Bot?", `${user.user.bot}`, true)
.addField("Game", `${user.presence.game ? user.presence.game.name : 'None'}`, true)

.addField('Roles ',  rolopes.join(', '), true)

   message.channel.send(emboped)




};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["uinfo"],
  permLevel: 0
};

exports.help = {
  name: "userinfo",
  description: "gives you info about user",
  category: "info",
  usage: " userinfo <@user>"
};
