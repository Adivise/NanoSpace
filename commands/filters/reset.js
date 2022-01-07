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

        const player = client.manager.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

		await player.setFilter('filters', reset);
        await player.setVolume(normal);
        
        const resetted = new MessageEmbed()
            .setAuthor({ name: "Filter has been: Reseted", iconURL: 'https://cdn.discordapp.com/emojis/758423099178745876.gif'})
            .setColor('#000001');

        await delay(5000);
        msg.edit({ content: " ", embeds: [resetted] });
            console.log(chalk.magenta(`[COMMAND] Reset used by ${message.author.tag} from ${message.guild.name}`));
   }
};