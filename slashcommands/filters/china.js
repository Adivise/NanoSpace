const delay = require('delay');
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { china } = require('../../config/filter');

module.exports = { 
    name: "china",
    description: "Turning on china filter",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],

    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply("Turning on **China**. This may take a few seconds...");

        const player = client.manager.get(interaction.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        await player.setFilter('filters', china);

        const chinad = new MessageEmbed()
            .setAuthor({ name: "Turned on: China", iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif' })
            .setColor('#000001');

        await delay(5000);
        msg.edit({ content: " ", embeds: [chinad] });
            console.log(chalk.magenta(`[SLASHCOMMAND] China used by ${interaction.user.tag} from ${interaction.guild.name}`));
   }
};