const { Utils } = require("erela.js");
const chalk = require('chalk');
const delay = require('delay');

module.exports = { 
    config: {
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "Displays what the bot is currently playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
        const msg = await message.channel.send('Loading please wait...');

        const player = bot.music.players.get(message.guild.id);
        if (!player || !player.queue[0]) return message.channel.send("No song/s currently playing within this guild.");
        const { title, author, duration } = player.queue[0];

        await delay(2000);
            msg.edit(`**__Current Song Playing__** - **__${message.guild.name}__**\n \n\`${player.playing ? "▶️" : "⏸️"}\` **${title}** \`${Utils.formatTime(duration, true)}\` **by ${author}**`)
            console.log(chalk.magenta(`  [Command]: Nowplaying used by ${message.author.tag} from ${message.guild.name}`));
    }
}