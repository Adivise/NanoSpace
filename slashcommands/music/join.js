const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "join",
    description: "Makes the bot join the voice channel.",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],

    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply(`**Loading please wait...**`);

        const { channel } = interaction.member.voice;
        if(!channel) return msg.edit("You need to be in a voice channel.");

        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            selfDeafen: true,
        });

        await player.connect();

        const embed = new MessageEmbed()
            .setDescription(`\`🔊\` | **Joined:** \`${channel.name}\``)
            .setColor('#000001')

        msg.edit({ content: " ", embeds: [embed] })
        console.log(chalk.magenta(`[SLASHCOMMAND] Join used by ${interaction.user.tag} from ${interaction.guild.name}`));
    }
}
