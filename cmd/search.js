var Discord = require("discord.js");
const search = require('yt-search')

exports.run = async (bot, message, args, botownerid, ops = []) => {


    search(args.join(' '), function(err, res) {
var errormessage = new Discord.RichEmbed()
.setTitle("Error")
.setDescription(`An error happen in process | ${err}`)
        if (err) return message.channel.send(errormessage)
        let resp = ``;

        let videos = res.videos.slice(0, 10)
       
        for (var i in videos) {
            resp += `\n**${parseInt(i)+1}** - \`${videos[i].title}\`\n`;
        }
   
resp += `Choose number between 1 - ${videos.length}`;

var embed = new Discord.RichEmbed()
.setTitle(`Music select`)
.setDescription(resp)
.setTimestamp()
.setFooter(`Beta`, bot.user.displayAvatarURL)

message.channel.send(embed)

const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0 && m.author.id == message.author.id;

const collector = message.channel.createMessageCollector(filter)

collector.videos = videos;

collector.once('collect', function(m) {

    let commandFile = require(`./play.js`)

    commandFile.run(bot, message, [this.videos[parseInt(m.content)-1].url], botownerid, ops)
});
});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "search",
  description: "Search youtube for song",
    category: "music",
  usage: " Search <song name>"
};
