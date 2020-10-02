const delay = require('delay');
const { earrape } = require('../../config/volume.js')
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "earrape",
        description: "Destroy your ear!",
        category: "filters",
        accessableby: "Member",
        aliases: ["ear"]
    },

    run: async (client, message, filter) => {
        const msg = await message.channel.send("Turning on `Earrape` please wait...");

        const player = client.music.players.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");

        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        player.setVolume(earrape);
        player.setEQ(...Array(6).fill(0).map((n, i) => ([{ band: i, gain: 0.5 }])));

        const earrapped = new MessageEmbed()
            .setAuthor("Turn on filter: Earrape", 'https://cdn.discordapp.com/emojis/758423098885275748.gif')
            .setColor('#000001');

        await delay(5000);
        msg.edit('', earrapped);
                console.log(chalk.magenta(`  [Command]: Earrape used by ${message.author.tag} from ${message.guild.name}`));
    }
};