var Discord = require("discord.js");
const ytdl = require('ytdl-core');
var moment = require("moment")
  exports.run = async (bot, message, args, botownerid, ops = []) => {

      



    if (!message.member.voiceChannel) return message.channel.send('Please enter a voice channel.');

    if(!args[0]) return message.channel.send('Please input a url following the command.');

    let validate = await ytdl.validateURL(args[0]);

    if(!validate) {
 
      let commandFile = require('./search.js')
      return commandFile.run(bot, message, args, botownerid, ops);

    }

    let info = await ytdl.getInfo(args[0]);

    let data = ops.active.get(message.guild.id) || {};


    if (!data.connection) data.connection = await message.member.voiceChannel.join();

    if (!data.queue) data.queue = [];


    data.guildID = message.guild.id;
    data.queue.push({
        songTitle: info.title,
        requester: message.author.username,
        requesterImg: message.author.avatarURL,
        url: args[0],
        announceChannel: message.channel.id
    

    });

    if (!data.dispatcher) play(bot, ops, data)
    else {
      let info2 = await ytdl.getInfo(data.queue[data.queue.length-1].url);
      let vid_time_mil = info2.length_seconds * 1000
      let vidtime = moment.duration(vid_time_mil).format(" D [days], H [hrs], m [mins], s [secs]");
      var playembed2 = new Discord.RichEmbed()
      .setTitle("<:songs:472867147274649610> Added to queue")
      .setDescription(`[ ${info2.title}](https://www.youtube.com/watch?v=${info2.video_id})`)
      .addField("Channel", info2.author.name, true)
      .addField("Video duration", vidtime, true)
      .addField("View count", info2.view_count, true)
      .addField("Songs in queue", data.queue.length, true)
      .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
      .setTimestamp()
      .setThumbnail(info2.thumbnail_url)
      .setColor('36393e')
  message.channel.send(playembed2)
}


ops.active.set(message.guild.id, data);

};




async function play(bot, ops, data) {
  let info1 = await ytdl.getInfo(data.queue[0].url);
  let vid_time_mil = info1.length_seconds * 1000
  let vidtime = moment.duration(vid_time_mil).format(" D [days], H [hrs], m [mins], s [secs]");
  var playembed1 = new Discord.RichEmbed()
  .setTitle("<:songs:472867147274649610> started playing")
  .setDescription(`[ ${info1.title}](https://www.youtube.com/watch?v=${info1.video_id})`)
  .addField("Channel", info1.author.name, true)
  .addField("Video duration", vidtime, true)
  .addField("View count", info1.view_count, true)
  .addField("Songs in queue", data.queue.length, true)
  .setFooter(`Requested by: ${data.queue[0].requester}`, data.queue[0].requesterImg)

  .setTimestamp()
  .setThumbnail(info1.thumbnail_url)
  .setColor('36393e')
  bot.channels.get(data.queue[0].announceChannel).send(playembed1).catch(e => console.log(e))

  data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly'}));
  data.dispatcher.guildID = data.guildID;

  data.dispatcher.once('end', function() {
    finish(bot, ops, this);

  });

   
      }


function finish(bot, ops, dispatcher) {
  let fetched = ops.active.get(dispatcher.guildID);

  fetched.queue.shift();

  if (fetched.queue.length > 0) {

      ops.active.set(dispatcher.guildID, fetched);
      play(bot, ops, fetched)
      
  }   else {
      ops.active.delete(dispatcher.guildID);

      let vc = bot.guilds.get(dispatcher.guildID).me.voiceChannel;
      if (vc) vc.leave();
  }
}





/*
    let info = await ytdl.getInfo(args[0]);



let dispatcher = await connection.playStream(ytdl(args[0], { filter: 'audioonly'}));

let vid_time_mil = info.length_seconds * 1000
let vidtime = moment.duration(vid_time_mil).format(" D [days], H [hrs], m [mins], s [secs]");
var playembed = new Discord.RichEmbed()
.setTitle("<:wavas:453624683456364546> started playing")
.setDescription(`[ ${info.title}](https://www.youtube.com/watch?v=${info.video_id})`)
.addField("Channel", info.author.name, true)
.addField("Video duration", vidtime, true)
.addField("Requested by", message.author, true)
.addField("Songs in queue", "IN WORK", true)
.setTimestamp()
.setThumbnail(info.thumbnail_url)
.setColor('36393e')
message.channel.send(playembed)
*/


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "play",
  description: "Plays a song <link needed>",
  category: "music",
  usage: " play <song link>"
};

