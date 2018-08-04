var Discord = require("discord.js");
const fs = require("fs");
const { post } = require("snekfetch");
const db = require('quick.db');

  exports.run = async (bot, message, args, botownerid, ops = []) => {

    bot.embed = function botEmbed(options = {}) {
      const title = options.title ? options.title : undefined;
      const thumbnail = options.thumbnail ? options.thumbnail : undefined;
      const image = options.image ? options.image : undefined;
      const description = options.description ? options.description : undefined;
      const footer = options.footer ? options.footer : undefined;
      const timestamp = options.timestamp ? options.timestamp : false;
      const footerIcon = options.footerIcon ? options.footerIcon : null;
      const fields = options.fields ? options.fields : undefined;
      const color = options.color ? options.color : bot.color;
      const author = options.author ? options.author : undefined;
      const e = new Discord.RichEmbed()

      if (fields === undefined) {} else { for (const field of fields) e.addField(field.name, field.value, field.inline ? field.inline : false); }
      if (title === undefined) {} else { e.setTitle(title); }
      if (description === undefined) {} else { e.setDescription(description); }
      if (color === undefined) {} else { e.setColor(color); }
      if (author === undefined) {} else { e.setAuthor(author.name, author.icon, author.url ? author.url : null); }
      if (timestamp === false) {} else { e.setTimestamp(); }
      if (footer === undefined) {} else { e.setFooter(footer, footerIcon); }
      if (thumbnail === undefined) {} else { e.setThumbnail(thumbnail); }
      if (image === undefined) {} else { e.setImage(image); }

      return e;
  };
 

  if (message.author.id === "191615236363649025" || message.author.id === "365444611981967371") {
    const toEval = args.join(" ");
    if (!toEval) { return message.channel.send(":x: You must provide code to evaluate!"); } else {
        const m = await message.channel.send(`<a:loading:453239300222484490> Evaluating `);
        try {
            let result = eval(toEval);
            if (typeof result !== "string") { result = await require("util").inspect(result, { maxDepth: 0, showHidden: true }); }
            if (result.length > 1024) {
                const haste = await bot.haste(result.replace(new RegExp(bot.token, "g"), "NOPE"), "js");
             
                m.edit("", bot.embed({
                    title: "Evaled!",
                    fields: [
                        { name: "Code:", value: `\`\`\`js\n${toEval}\`\`\``},
                        { name: "Result:", value: haste }
                    ],
                    footer: `Evaluated by ${message.author.username} in ${m.createdTimestamp - message.createdTimestamp}ms`
                }));
            } else {
                m.edit(bot.embed({
                    title: "Evaled!",
                    fields: [
                        { name: "Code:", value: `\`\`\`js\n${toEval}\`\`\`` },
                        { name: "Result:", value: `${result.replace(new RegExp(bot.token, "g"), "NOPE")}` }
                    ],
                    footer: `Evaluated by ${message.author.username} in ${m.createdTimestamp - message.createdTimestamp}ms | Type: ${typeof result}`
                }));
            }
        } catch (error) {
            m.edit(bot.embed({
                title: "failed!",
                fields: [
                    { name: "Code:", value: `\`\`\`js\n${toEval}\`\`\`` },
                    { name: "Error:", value: `${error}` }
                ],
                color: 0xff0000,
                footer: `Evaluated by ${message.author.username} in ${m.createdTimestamp - message.createdTimestamp}ms`
            }));
        }
    }
    } else {
      var owneronlyembed = new Discord.RichEmbed()
      .setTitle('Error')
      .setDescription("<:error:454318141938597899> missing perms : be owner of bot l0l")  
      .setColor('36393e')
message.channel.send(owneronlyembed)
    } 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ev'],
  permLevel: 4
};

exports.help = {
  name: "eval",
  description: "Evaluates arbitrary Javascript. Not for the faint of heart.\nExpression may contain multiple lines. Oh and **you** can't use it.",
  category: "owner",
  usage: "eval <expression>"
};

function clean(text) {
  if (typeof(text) === "string") {
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
    return text;
  }
}
