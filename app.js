const Discord = require("discord.js");
var bot = new Discord.Client({ fetchAllMembers: true, disableEveryone: true, autoReconnect: true });
const config = require("./config.js");
const fs = require("fs");
const moment = require("moment");
const db = require('quick.db');
var ownerID = "191615236363649025";
const dateFormat = require('dateformat');
//const Canvas = require('canvas');
const { post } = require("snekfetch");
const hastebin = require('hastebin-gen');


//MUSIC



const active = new Map();





const log = (msg) => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${msg}`);
};

    bot.config = require("./config.js");
    var botownerid = bot.config.ownerid;

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
fs.readdir("./cmd/", (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./cmd/${f}`);
    log(`Loading Command: ${props.help.name}.`);
    bot.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
  });
});
/////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
bot.on("message", async message => {
let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: bot.config.prefix
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;

  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let args = message.content.split(" ").slice(1);
 
  let perms = bot.elevation(message);
  let cmd;
  if (bot.commands.has(command)) {
    cmd = bot.commands.get(command);
  } else if (bot.aliases.has(command)) {
    cmd = bot.commands.get(bot.aliases.get(command));
  }
  if (cmd) {
    var commandoffembedguild = new Discord.RichEmbed()
    .setTitle('Command Disabled')
    .setDescription("<:error:454318141938597899> The command is disabled by bot owner")  
    .setColor('36393e')
  var guildOnlyembed = new Discord.RichEmbed()
  .setTitle("Guild only")
  .setDescription("<:error:454318141938597899> Sorry but you can use this command in gulid only")
  .setColor('36393e')
  let ops = {
    ownerID: ownerID,
    active: active
  }
if (cmd.conf.guildOnly === true) {
  if(message.channel.type === "dm") return message.author.send(guildOnlyembed)
 
  if (perms < cmd.conf.permLevel) return;
     if (cmd.conf.enabled == false) return message.channel.send(commandoffembedguild)

      cmd.run(bot, message, args, botownerid, ops);
} else {
  if (perms < cmd.conf.permLevel) return;
     if (cmd.conf.enabled == false) return message.channel.send(commandoffembedguild)
     
     cmd.run(bot, message, args, botownerid, ops);
    }

  }
});
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

bot.on("ready", async () => {

  setInterval(function () {
     var gamelist = [`${bot.guilds.size} servers! || //help`, `${bot.users.size} users || //help`, `yossaf#7001`, 'everyone', 'cat vids']
    var randomNumber = Math.floor((Math.random() * gamelist.length) + 0);
      bot.user.setActivity(`${gamelist[randomNumber]}`, {
         type: "WATCHING",

     });
   


  }, 15000)





 
  log(`${bot.user.username}: Ready to serve ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} servers.`);
});

bot.on("error", console.error);
bot.on("warn", console.warn);

bot.login(bot.config.token);

  bot.reload = function(command) {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./cmd/${command}`)];
        let cmd = require(`./cmd/${command}`);
        bot.commands.delete(command);
        bot.aliases.forEach((cmd, alias) => {
          if (cmd === command) bot.aliases.delete(alias);
        });

        bot.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          bot.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e){
        reject(e);
      }
    });
  };
  bot.haste = async function botHaste(text, type) {
    const promise = new Promise(async (res, rej) => {
        if (!text) return rej("Text needs to be provided!");
        if (!type) type = "txt";
       await hastebin(text, type).then(r => res(`https://hastebin.com/${r.body.key}`)).catch(e => rej(e));

   
    });
    return promise;
};
bot.elevation = function(message) {
  let permlvl = 0;
  if(message.author.id === bot.config.botadminid) permlvl = 3;
  if(message.author.id === bot.config.ownerid) permlvl = 4;
  return permlvl;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////p//////////////////////////////////////////////////////////////////



bot.on('guildMemberAdd', async member => {
 
  var welchannel = await db.fetch(`gulid__${member.guild.id}`, { target: '.welcome' });
    const c = await member.guild.channels.get(welchannel);
    if (!c) return;
    var welenable = await db.fetch(`gulid__${member.guild.id}`, { target: '.welcome_enable' });
    if(welenable == false) return;

  const millisJoined = new Date().getTime() - member.user.createdAt.getTime();
  const daysCreated = millisJoined / 1000 / 60 / 60 / 24;
  let member2 = member.guild.member(member);

  var memberadded = new Discord.RichEmbed()
      .setTitle(member.user.tag)
      .setThumbnail(member.user.displayAvatarURL)
      .addField("Joined server at", dateFormat(member.joinedAt), true)
      .addField("Joined discord Since", `${dateFormat(member.user.createdAt)}\n ${daysCreated.toFixed(0)} days ago`, true)
      .addField("Bot?", (member.user.bot ? "Yes" : "No"), true)
      .addField("Member count", member.guild.members.size, true)
      .setFooter("Member Joined", member.user.displayAvatarURL)
      .setTimestamp()
      c.send(memberadded)
 
  });


/*
bot.on('channelUpdate', (oldChannel, newChannel) => {
  var modlog = oldChannel.guild.channels.find('name', 'mod-log');
    var channelupdateeventembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Channel Updated')
        .setDescription('**Before:** ' + oldChannel + ` Name: ${oldChannel.name}` + '\n **After:**' + newChannel + ` Name: ${newChannel.name}`)
      if(modlog) return modlog.send({embed: channelupdateeventembed}).catch(console.error);
      });
*/
/*
bot.on('channelPinsUpdate', (channel, time) => {
  var modlog = channel.guild.channels.find('name', 'mod-log');
    var channelpinsupdateembed = new Discord.RichEmbed()
      .setColor('FFCE00')
      .setTitle('Channel Pins Updated')
      .addField(`Channel: ${channel.name}`, time)
     
    if(modlog) return modlog.send({embed: channelpinsupdateembed}).catch(console.error);
        });
        //----------------------\\
        */
       /*
        bot.on('guildUpdate', (oGuild, nGuild) => {
          var modlog = oGuild.channels.find('name', 'mod-log')
          var guildupdateembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Guild Updated')
            .setDescription('The Guild has been updated! \n \n **Before:** ' + oGuild + ' \n \n **After:** ' + nGuild)
            
            if(modlog) return modlog.send({embed: guildupdateembed  }).catch(console.error);
              
            });
            */
           /*
        bot.on('guildBanRemove', async (guild, user) => {
          var isEnabled = await db.fetch(`gulid__${user.guild.id}`, { target: '.mod_logs_enabled' });
          if (isEnabled == false) return; 
          var modlogschan = await db.fetch(`gulid__${user.guild.id}`, { target: '.mod_logs' });
          var modlog = await user.guild.channels.get(modlogschan);
          if (!modlog) return;
          var newunbanembed = new Discord.RichEmbed()
            
            .setDescription('The user ' + user.tag + ' has been unbanned')
            .setAuthor(user.username , user.displayAvatarURL)
            
            if(modlog) {
              modlog.send({embed: newunbanembed}).catch(console.error);
            }
            
          
          });
          
*/
        //----------------\\
        bot.on('roleCreate', async role => {
          var isEnabled = await db.fetch(`gulid__${role.guild.id}`, { target: '.mod_logs_enabled' });
          if (isEnabled == false) return; 
          var modlogschan = await db.fetch(`gulid__${role.guild.id}`, { target: '.mod_logs' });
          var modlog = await role.guild.channels.get(modlogschan);
          if (!modlog) return;
          var rolecreateembed = new Discord.RichEmbed()
            .setColor('FFCE00')
            .setTitle('Role Created')
            .setDescription(role)
            .setTimestamp()
            
            if(modlog) return modlog.send({embed: rolecreateembed}).catch(console.error);
              
            });
            
            bot.on('roleUpdate', async role => {
              var isEnabled = await db.fetch(`gulid__${role.guild.id}`, { target: '.mod_logs_enabled' });
              if (isEnabled == false) return; 
              var modlogschan = await db.fetch(`gulid__${role.guild.id}`, { target: '.mod_logs' });
              var modlog = await role.guild.channels.get(modlogschan);
              if (!modlog) return;
              var roleupdateembed = new Discord.RichEmbed()
                .setColor('FFCE00')
                .setTitle('Role Updated')
                .setDescription(role)
          
                if(modlog) return modlog.send({embed: roleupdateembed}).catch(console.error);
                  
                });
                
                bot.on('roleDelete', async role => {
                  var isEnabled = await db.fetch(`gulid__${role.guild.id}`, { target: '.mod_logs_enabled' });
                  if (isEnabled == false) return; 
                  var modlogschan = await db.fetch(`gulid__${role.guild.id}`, { target: '.mod_logs' });
                  var modlog = await role.guild.channels.get(modlogschan);
                  if (!modlog) return;
                  var roledeleteembed = new Discord.RichEmbed()
                    .setColor('FFCE00')
                    .setTitle('Role Deleted')
                    .setDescription(role.name)
                    if(modlog) return modlog.send({embed: roledeleteembed}).catch(console.error);
                      
                    });
                    //---------------------\\
                    /*
                    bot.on('messageUpdate', (oldMessage, newMessage) => {
                        if(oldMessage.author.bot) return;
                      if (oldMessage.channel.type !== 'text') return;
                      var modlog = oldMessage.guild.channels.find('name', 'mod-log');
                      let messageUpdatelog = new Discord.RichEmbed()
                      messageUpdatelog.setTitle('✍ Message edited');
                      messageUpdatelog.addField('User', oldMessage.author.tag, true);
                      messageUpdatelog.addField('UserID', oldMessage.author.id, true);
                      messageUpdatelog.addField('Old Message', (oldMessage.cleanContent === '' ? '<empty message>' : oldMessage.cleanContent));
                      messageUpdatelog.addField('New Message', (newMessage.cleanContent === '' ? '<empty message>' : newMessage.cleanContent));
                      messageUpdatelog.addField('MessageID', oldMessage.id);
                      messageUpdatelog.addField('Channel', oldMessage.channel.name, true);
                      messageUpdatelog.addField('ChannelID', oldMessage.channel.id, true);
                      messageUpdatelog.setColor('FFCE00');
                      if(modlog) return modlog.send({embed: messageUpdatelog}).catch(console.error);
                  });
                  */
                  bot.on('messageDelete', async message => {
                    var isEnabled = await db.fetch(`gulid__${message.guild.id}`, { target: '.mod_logs_enabled' });
                    if (isEnabled == false) return; 
                      if (message.channel.type !== 'text') return;
                      if(message.author.bot) return;
                      var prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
                      if(message.content.startsWith(prefixes[message.guild.id].prefixes)) return;
                      var modlogschan = await db.fetch(`gulid__${message.guild.id}`, { target: '.mod_logs' });
                      var modlog = await message.guild.channels.get(modlogschan);
                      if (!modlog) return;
            
                      let messageDeletelog = new Discord.RichEmbed()
                      messageDeletelog.setTitle('Message deleted');
                  
                      messageDeletelog.addField('User', message.author.tag, true);
                      messageDeletelog.addField('Message', message.cleanContent == '' ? "<empty message>" : message.cleanContent >= 1000 ? bot.haste(message.cleanContent, "txt") : message.cleanContent, true);
                      messageDeletelog.addField('Channel', message.channel, true);
                      messageDeletelog.addField('Has attachment?', (message.attachments.size === 0) ? 'No' : 'Yes', true);
                      messageDeletelog.setFooter(`User ID: ${message.author.id}`, message.author.avatarURL);
                      messageDeletelog.setThumbnail(bot.user.avatarURL)
                      messageDeletelog.setTimestamp()
                      if(modlog) return modlog.send({embed: messageDeletelog}).catch(console.error);
                  });
    

                  bot.on("guildCreate", guild => {
                    db.set(`gulid__${guild.id}`, { prefix: "//", welcome: "null", welcome_enable: false, mod_logs: "null", report_channel: "null", mod_logs_enabled: false})
                    db.set(`cases__${guild.id}`, 0);
                });
                bot.on("guildDelete", guild => {
                  db.delete(`gulid__${guild.id}`)
                    db.delete(`cases__${guild.id}`)
              });
              
                

     
