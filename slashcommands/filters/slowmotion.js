const delay = require('delay');
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { slowmotion } = require('../../config/filter');

module.exports = { 
    name: "slowmotion",
    description: "Turning on slowmotion filter",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],

    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply("Turning on **Slow Motion**. This may take a few seconds...");

        const player = client.manager.get(interaction.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        await player.setFilter('filters', slowmotion);

        const slowmotiond = new MessageEmbed()
            .setAuthor({ name: "Turned on: Slow Motion", iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif' })
            .setColor('#000001');

        await delay(5000);
        msg.edit({ content: " ", embeds: [slowmotiond] });
            console.log(chalk.magenta(`[SLASHCOMMAND] Slow Motion used by ${interaction.user.tag} from ${interaction.guild.name}`));
   }
};