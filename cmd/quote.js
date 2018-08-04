var Discord = require("discord.js");
const superagent = require('superagent');
  exports.run = async (bot, message, args = []) => {

      


    let req = await superagent.get('https://talaikis.com/api/quotes/random/');
    
 const quoteembed = new Discord.RichEmbed()
 .setTitle("Rnadom quote")
 .setColor('36393e')
 .setDescription(`${req.body.quote} \n -- *${req.body.author}*`)
message.channel.send(quoteembed)




};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "quote",
  description: "gives you a random quote",
  category: "fun",
  usage: " quote"
};
