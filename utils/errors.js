const Discord = require("discord.js");
const fs = require("fs");
var color_red = "#ff0000";


module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setTitle(" Insufficient Permission")
        .setColor(color_red)
        .addField("<:error:435353029856985088> Permission needed", perm);

    message.channel.send(embed).then(m => m.delete(7000));
}

module.exports.equalPerms = (message, user, perms) => {

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor(color_red)
        .setTitle(" Error")
        .addField(`<:error:435353029856985088> ${user} has perms`, perms);

    message.channel.send(embed).then(m => m.delete(7000));

}

module.exports.botuser = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle(" Error")
        .setDescription("<:error:435353029856985088> You cannot ban a bot.")
        .setColor(color_red);

    message.channel.send(embed).then(m => m.delete(7000));
}

module.exports.cantfindUser = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle(" Error")
        .setDescription("<:error:435353029856985088> Could not find that user.")
        .setColor(color_red);

    channel.send(embed).then(m => m.delete(7000));
}

module.exports.noReason = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle(" Error")
        .setDescription("<:error:435353029856985088> Please supply a reason.")
        .setColor(color_red);

    channel.send(embed).then(m => m.delete(7000));
}
module.exports.sameuser = (message, channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle(" Error")
        .setDescription("<:error:435353029856985088> Can't report yourself.")
        .setColor(color_red);

    channel.send(embed).then(m => m.delete(7000));
}

