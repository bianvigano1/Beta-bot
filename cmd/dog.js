var Discord = require("discord.js");
const superagent = require("superagent");
  exports.run = async (bot, message, args = []) => {

      

    let {body} = await superagent
    .get(`https://random.dog/woof.json`);

    let dogembed = new Discord.RichEmbed()

    .setColor("36393e")
    .setTitle("Random dog")
    .setImage(body.url)


    message.channel.send(dogembed)


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "dog",
  description: "Gives you random dog",
  category: "fun",
  usage: " dog"
};
