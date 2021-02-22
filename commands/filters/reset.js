const delay = require('delay');
const { normal } = require('../../config/volume.js');
const { reset } = require('../../config/filter')
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "reset",
        description: "reseting all filters",
        category: "filters",
        accessableby: "Member",
        aliases: []
    },

    run: async (client, message) => {
        const msg = await message.channel.send("Turning off `filter` please wait...");

        const player = client.music.players.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");

        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

		player.setFilter('filters', reset);
        player.setVolume(normal);
        
        const resetted = new MessageEmbed()
        .setAuthor("Filter has been: Reseted", 'https://cdn.discordapp.com/emojis/758423099178745876.gif')
        .setColor('#000001');

        await delay(5000);
        msg.edit('', resetted);
            console.log(chalk.magenta(`  [Command]: Reset used by ${message.author.tag} from ${message.guild.name}`));
   }
};