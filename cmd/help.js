var Discord = require("discord.js");
  exports.run = async (bot, message, args) => {

  
    if (!args[0]) {
   
      var catgorys = ["fun", "info", "administration", "owner", "music"]

      let funi = ``;
      let funn = 0
      let infoi = ``;
      let infon = 0;
      let administrationi = ``;
      let administrationn = 0;
      let owneri = ``;
      let ownern = 0;
      let music1 = ``;
      let musicn = 0;
let commadnum = 0;

      await bot.commands.forEach(c => {
        if(c.help.category == catgorys[0]) { funi += `\`${c.help.name}\`, `;
         funn += 1;
         commadnum += 1;
         }
if(c.help.category == catgorys[1])  { infoi += `\`${c.help.name}\`, `;
infon += 1;
commadnum += 1;

        }
if(c.help.category == catgorys[2]) { administrationi += `\`${c.help.name}\`, `;
administrationn += 1;
commadnum += 1;

}

if(c.help.category == catgorys[3]) { owneri += `\`${c.help.name}\`, `;
ownern += 1;
commadnum += 1;
}

if(c.help.category == catgorys[4]) { music1 += `\`${c.help.name}\`, `;
musicn += 1;
commadnum += 1;
}
});
if(message.author.id == "191615236363649025" || message.author.id == "365444611981967371") {

  var nembed = new Discord.RichEmbed()

  .setTitle("Command List")
  .setDescription("Do //help <command> to get more info about command")
  .setFooter(`requested by ${message.author.username} | total commands: ${commadnum}`, message.author.displayAvatarURL)
  .setTimestamp()
  .setThumbnail(bot.user.displayAvatarURL)
  .addField(`Fun commands [${funn}]`, funi.slice(0, funi.length - 2))
  .addField(`info commands [${infon}]`, infoi.slice(0, infoi.length - 2))
  .addField(`music commands [${musicn}]`, music1.slice(0, music1.length - 2))
  .addField(`administration commands [${administrationn}]`, administrationi.slice(0, administrationi.length - 2))
  .addField(`Bot admin commands [${ownern}]`, owneri.slice(0, owneri.length - 2))


  
  
    message.channel.send(embed)

} else {
  var embed = new Discord.RichEmbed()

  .setTitle("Command List")
  .setDescription("Do //help <command> to get more info about command")
  .setFooter(`requested by ${message.author.username} | total commands: ${commadnum}`, message.author.displayAvatarURL)
  .setTimestamp()
  .setThumbnail(bot.user.displayAvatarURL)
  .addField(`Fun commands [${funn}]`, funi.slice(0, funi.length - 2))
  .addField(`info commands [${infon}]`, infoi.slice(0, infoi.length - 2))
  .addField(`music commands [${musicn}]`, music1.slice(0, music1.length - 2))
  .addField(`administration commands [${administrationn}]`, administrationi.slice(0, administrationi.length - 2))
  
 

    message.channel.send(embed)


};
    
    } else {
    let command = args[0];
    if(bot.commands.has(command)) {
      command = bot.commands.get(command);
      let aliasestext = ``;
        command.conf.aliases.forEach(function (aaa) {
          aliasestext += ` \`${aaa}\`,  `
        });
      
      var embed = new Discord.RichEmbed()

      .setTitle(`${command.help.name}`)
      .setFooter(`requested by ${message.author.username}`, message.author.displayAvatarURL)
      .setTimestamp()
      .setDescription(`\n${command.help.description}\n\n  **usage**  :    //${command.help.usage} \n \naliases: \n ${aliasestext.slice(0, aliasestext.length - 3)}`)
      .setColor('36393e')
      message.channel.send(embed)
      }
    
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["commands", "test1", "test2"],
  permLevel: 0
};

exports.help = {
  name : "help",
  description: "Returns commad details",
  category: "info",
  usage: " help [command]"
};
