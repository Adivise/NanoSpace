const delay = require('delay');
const { earrape } = require('../../config/volume.js')
const { reset } = require('../../config/filter.js')
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "earrape",
    description: "Destroy your ear!",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],

    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply("Turning on **Earrape**. This may take a few seconds...");

        const player = client.manager.get(interaction.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

		await player.setVolume(earrape);
		await player.setFilter('filters', reset);

        const earrapped = new MessageEmbed()
            .setAuthor({ name: "Turn on filter: Earrape", iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
            .setColor('#000001');

        await delay(3000);
        msg.edit({ content: " ", embeds: [earrapped] });
                console.log(chalk.magenta(`[SLASHCOMMAND] Earrape used by ${interaction.user.tag} from ${interaction.guild.name}`));
    }
};