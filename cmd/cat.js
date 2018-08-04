var Discord = require("discord.js");
const superagent = require("superagent");
  exports.run = async (bot, message, args = []) => {

      

    let req = await superagent.get('http://thecatapi.com/api/images/get?format=src&results_per_page=1');
    let cateemed = new Discord.RichEmbed()

    .setColor("36393e")
    .setTitle("Random cat")
    .setImage(req.redirects[0])


    message.channel.send(cateemed)





};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "cat",
  description: "gives you a random cat",
  category: "fun",
  usage: " cat"
};
