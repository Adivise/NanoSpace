const delay = require('delay');
const { earrape } = require('../../config/volume.js')
const { reset } = require('../../config/filter.js')
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

    run: async (client, message) => {
        const msg = await message.channel.send("Turning on **Earrape**. This may take a few seconds...");

        const player = client.manager.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

		await player.setVolume(earrape);
		await player.setFilter('filters', reset);

        const earrapped = new MessageEmbed()
            .setAuthor({ name: "Turn on filter: Earrape", iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
            .setColor('#000001');

        await delay(3000);
        msg.edit({ content: " ", embeds: [earrapped] });
                console.log(chalk.magenta(`[COMMAND] Earrape used by ${message.author.tag} from ${message.guild.name}`));
    }
};