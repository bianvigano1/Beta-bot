var Discord = require("discord.js");
const { get } = require("snekfetch");

  exports.run = async (bot, message, args = []) => {

      var apitoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImY3ZTk4NzA2LWI4MjgtNDdjYS1iMmE1LWI5MzljY2FmNjAxOSIsImlhdCI6MTUyOTg1MDEwMywic3ViIjoiZGV2ZWxvcGVyL2MyZjFhMWY1LTE2ZDctNTBjYS1lN2MzLWU5OGZlZDQ2ZDc0NCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE5Ny40Mi4yMTguMTUiXSwidHlwZSI6ImNsaWVudCJ9XX0.QBQ1KJihaAcyo5cuGAFykdHWtFPQhPM5BrPrI2buZ5anTr6GnZKi7748rEtZN7OLZ7uig1QnaeCgGsjga1a_7w";


    const data = await get(`https://api.clashofclans.com/v1/players/${encodeURIComponent(args)}`)
    .set({ Accept: "application/json", Authorization: `Bearer ${apitoken}` })
    .catch(error => {
        if (error.reason === "notFound") message.channel.send("***Invalid Tag, please retry with a valid one which you can find under In-game.***");
        Error.captureStackTrace(error);
        return null;
    });

if (!data) return message.channel.send("Couldn't find your data, try again later.");

const playerData = data.body;
console.log(playerData)
const embed = new Discord.RichEmbed()
    .setColor("#36393e")
    .setAuthor(playerData.name + `  |   exp_level: ${playerData.expLevel}`, playerData.league ? playerData.league.iconUrls.small : null)
    .setThumbnail(`https://coc.guide/static/imgs/other/town-hall-${playerData.townHallLevel}.png`);

if (playerData.clan) embed.setFooter(`${playerData.role} of " ${playerData.clan.name} "\u200e ${playerData.clan.tag}`, playerData.clan.badgeUrls.small);

embed.addField("[❯] League", playerData.league ? playerData.league.name : "N/A", true)
     .addField("[❯] townHall", playerData.townHallLevel, true)
    .addField("[❯] War Stars", playerData.warStars, true)
    .addField("[❯] builderHall level", playerData.builderHallLevel, true)
    .addField("[❯] Trophies", playerData.trophies, true)
    .addField("[❯] Best Trophies", playerData.bestTrophies, true);
let troopLevels = "", spellLevels = "", heroLevels = "";

playerData.troops.forEach(troop => troopLevels += `${troop.name}: ${troop.level} ${troop.level === troop.maxLevel ? " [MAX]\n" : "\n"}`); // eslint-disable-line
if (troopLevels) embed.addField("[❯] Troop Levels", troopLevels, true);





playerData.spells.forEach(spell => spellLevels += `${spell.name}: ${spell.level} ${spell.level === spell.maxLevel ? " [MAX]\n" : "\n"}`); // eslint-disable-line
if (spellLevels) embed.addField("[❯] Spell Levels", spellLevels, true);



playerData.heroes.forEach(hero => heroLevels += `${hero.name}: ${hero.level} ${hero.level === hero.maxLevel ? " [MAX]\n" : "\n"}`); // eslint-disable-line
if (heroLevels) embed.addField("[❯] Hero Levels", heroLevels, true);

message.channel.send(embed);





};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "coc",
  description: "gives you information about coc player",
  category: "info",
  usage: " coc <tag>"
};
