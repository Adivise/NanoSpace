const delay = require('delay');
const { normal } = require('../../config/volume.js');
const { reset } = require('../../config/filter')
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "reset",
    description: "reseting all filters",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],
    
    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply("Turning off `filter` please wait...");

        const player = client.manager.get(interaction.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

		await player.setFilter('filters', reset);
        await player.setVolume(normal);
        
        const resetted = new MessageEmbed()
            .setAuthor({ name: "Filter has been: Reseted", iconURL: 'https://cdn.discordapp.com/emojis/758423099178745876.gif' })
            .setColor('#000001');

        await delay(5000);
        msg.edit({ content: " ", embeds: [resetted] });
            console.log(chalk.magenta(`[SLASHCOMMAND] Reset used by ${interaction.user.tag} from ${interaction.guild.name}`));
   }
};