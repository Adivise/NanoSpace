const { ErelaClient, Utils } = require("erela.js");
const { Collection } = require("discord.js");
const figlet = require('figlet');
const chalk = require('chalk');
const { nodes } = require("../../config.json");

module.exports = bot => {
    figlet(bot.user.tag, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.red.bold(data));
    });

    bot.user.setStatus('dnd');

    bot.queue = new Collection();

    bot.music = new ErelaClient(bot, nodes)
        .on("nodeError", console.log)
        .on("nodeConnect", () => console.log(chalk.blue("   [Lavalink] Successfully Connected..")))
        .on("queueEnd", player => {
            player.textChannel.send("\`📛\` | **Song has been:** `Ended`")
                bot.music.players.destroy(player.guild.id)
        })
        .on("trackStart", ({textChannel}, {title, duration}) => textChannel.send(`\`▶\` Now playing: **${title}** \`${Utils.formatTime(duration, true)}\``));

    bot.levels = new Map()
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);

};
