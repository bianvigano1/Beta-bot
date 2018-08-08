var Discord = require("discord.js");
  exports.run = async (bot, message, args = []) => {

      

    var missingpermsembed = new Discord.RichEmbed()
    .setTitle('Error')
    .setDescription("<:cross:468412380057960448> Missing permissions : \"MANAGE_MESSAGES\"")  
    
    var notnumberembed = new Discord.RichEmbed()
    .setTitle('Error')
    .setDescription("<:cross:468412380057960448> Your input in not a valid number")  
    
    var noinputembed = new Discord.RichEmbed()
    .setTitle('Error')
    .setDescription("<:cross:468412380057960448> No input found")  
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(missingpermsembed)
    if(!args[0]) return message.channel.send(noinputembed);
    if(isNaN(args[0])) return message.channel.send(notnumberembed)
    
    message.channel.bulkDelete(args[0]).then(() => {
        const clearembed = new Discord.RichEmbed()
        
  .addField(`<:check:459949561096437770> Clear`,`Cleared ${args[0]} messages.`)
    message.channel.send(clearembed).then(msg => msg.delete(2000));
    });





};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["clean", "purge"],
  permLevel: 0
};

exports.help = {
  name: "clear",
  description: "clears a number of messages",
  category: "administration",
  usage: " clear <messages>"
};
