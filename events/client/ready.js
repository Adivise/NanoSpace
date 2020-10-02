const { ErelaClient, Utils } = require("erela.js");
const { Collection, MessageEmbed } = require("discord.js");
const figlet = require('figlet');
const chalk = require('chalk');
const { nodes, prefix } = require("../../config.json");

module.exports = async (client) => {
    figlet(client.user.tag, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.red.bold(data));
    });

    let activity = [`${client.guilds.cache.size} Guilds!`, `${client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)} | Members!`, `${client.channels.cache.size} | Channels!`], i = 0;
        setInterval(() => client.user.setActivity(`${prefix}help <command> | ${activity[i++ % activity.length]}`, { type: "LISTENING", url: "https://www.twitch.tv/nanotect_" }), 15000)

    client.queue = new Collection();

    client.music = new ErelaClient(client, nodes)
        .on("nodeError", console.log)
        .on("nodeConnect", () => console.log(chalk.blue("   [Lavalink] Successfully Connected..")))
        .on("queueEnd", player => {
            const embed = new MessageEmbed()
                .setDescription(`\`📛\` | **Song has been:** \`Ended\``)
                .setColor('#000001');

            player.textChannel.send(embed)
                client.music.players.destroy(player.guild.id)
        })

        .on("trackStart", ({ textChannel }, { title, duration, uri, identifier, requester, author }) => {

            const player = client.music.players.get(textChannel.guild.id);
            const qduration = Utils.formatTime(player.queue.reduce((acc, cur) => ({ duration: acc.duration + cur.duration })).duration, true);
            const embed = new MessageEmbed()
                .setAuthor(`Starting playing...`, 'https://cdn.discordapp.com/emojis/741605543046807626.gif')
                .setDescription(`**[${title}](${uri})**`)
                .setColor('#000001')
                .setThumbnail(`https://img.youtube.com/vi/${identifier}/hqdefault.jpg`)
                .addField('Author:', author, true)
                .addField('Requester:', requester, true)
                .addField('Current Volume:', player.volume, true)
                .addField('Queue Length:', player.queue.length, true)
                .addField('Duration:', `${Utils.formatTime(duration, true)}`, true)
                .addField('Total Duration:', qduration, true)
                .addField(`Current Duration: \`[0:00 / ${Utils.formatTime(duration, true)}]\``, `\`\`\`🔴 | 🎶──────────────────────────────\`\`\``)
                .setTimestamp();
            
            return textChannel.send(embed)
        })

    client.levels = new Map()
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);

};
