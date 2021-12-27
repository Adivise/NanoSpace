const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "volume",
    description: "Adjusts the volume of the bot.",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],
    options: [
        {
            name: "amount",
            description: "The amount of volume to set the bot to.",
            type: 4,
        }
    ],
    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const value = interaction.options.getInteger("amount");
        const msg = await interaction.editReply(`**Volume adjusting to ${value}...**`);

		const player = client.manager.get(interaction.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        if (!value) return msg.edit(`Current Volume: ${player.volume}`);
        if (Number(value) <= 0 || Number(value) > 100) return msg.edit("You may only set the volume to 1-100");

        await player.setVolume(Number(value));

        const changevol = new MessageEmbed()
            .setDescription(`\`🔊\` | **Change volume to:** \`${value}%\``)
            .setColor('#000001');
        
        msg.edit({ content: " ", embeds: [changevol] });
            console.log(chalk.magenta(`[SLASHCOMMAND] Volume used by ${interaction.user.tag} from ${interaction.guild.name}`));
    }
}