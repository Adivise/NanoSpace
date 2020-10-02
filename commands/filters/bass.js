const delay = require('delay');
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "bass",
        description: "Turning on bass filter",
        category: "filters",
        accessableby: "Member",
        aliases: [""]
    },

    run: async (client, message, filter) => {
        const msg = await message.channel.send("Turning on `Bass` please wait...");

        const player = client.music.players.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");

        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        player.setEQ([{ 'band': 0, 'gain': 0.6 }, { 'band': 1, 'gain': 0.67 }, { 'band': 2, 'gain': 0.67 }, { 'band': 3, 'gain': 0 }, { 'band': 4, 'gain': -0.5 }, { 'band': 5, 'gain': 0.15 }, { 'band': 6, 'gain': -0.45 }, { 'band': 7, 'gain': 0.23 }, { 'band': 8, 'gain': 0.35 }, { 'band': 9, 'gain': 0.45 }, { 'band': 10, 'gain': 0.55 }, { 'band': 11, 'gain': 0.6 }, { 'band': 12, 'gain': 0.55 }, { 'band': 13, 'gain': 0 }]);

        const bassed = new MessageEmbed()
            .setAuthor("Turn on filter: Bass", 'https://cdn.discordapp.com/emojis/758423098885275748.gif')
            .setColor('#000001');

        await delay(5000);
        msg.edit('', bassed);
            console.log(chalk.magenta(`  [Command]: Bass used by ${message.author.tag} from ${message.guild.name}`));
   }
};