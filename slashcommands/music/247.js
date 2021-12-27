const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "247",
    description: "make 24/7 in voice channel!",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],

    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply(`**Loading please wait...**`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.");

        if (player.twentyFourSeven) {
            player.twentyFourSeven = false;
            const off = new MessageEmbed()
            .setDescription("\`🌙\` | **Mode 24/7 has been:** `Disabled`")
            .setColor('#000001');

            msg.edit({ content: " ", embeds: [off] });
            console.log(chalk.magenta(`[SLASHCOMMAND] 24/7 used by ${interaction.user.tag} from ${interaction.guild.name}`));
        } else {
            player.twentyFourSeven = true;
            const on = new MessageEmbed()
            .setDescription("\`🌕\` | **Mode 24/7 has been:** `Enabled`")
            .setColor('#000001');

            msg.edit({ content: " ", embeds: [on] });
            console.log(chalk.magenta(`[SLASHCOMMAND] 24/7 used by ${interaction.user.tag} from ${interaction.guild.name}`));
        }
    }
}