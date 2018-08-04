var Discord = require("discord.js");
  exports.run = async (bot, message, args) => {
    let command;
    if (bot.commands.has(args[0])) {
      command = args[0];
    } else if (bot.aliases.has(args[0])) {
      command = bot.aliases.get(args[0]);
    }
    if (!command) {
      return message.channel.send(`I cannot find the command: ${args[0]}`);
    } else {
      message.channel.send(`<a:loading:453239300222484490> Reloading: ${command}`)
      .then(m => {
        bot.reload(command)
        .then(() => {
          m.delete()
          var reloadedrembed = new Discord.RichEmbed()
          .setTitle("Successfully reloaded")
          .setDescription(`<:check:459949561096437770>          command: **${command}**`)
          .setColor("#")
          m.channel.send(reloadedrembed);
        })
        .catch(e => {
          m.edit(`failed to reload command: ${command}\n\`\`\`${e.stack}\`\`\``);
        });
      });
    }
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["r"],
  permLevel: 3
};

exports.help = {
  name: "reload",
  description: "Reloads the command file, if it's been updated or modified.",
  category: "owner",
  usage: "reload <commandname>"
};
