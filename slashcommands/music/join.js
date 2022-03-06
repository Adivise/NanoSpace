const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "join",
    description: "Make the bot join the voice channel.",
    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply(`${client.i18n.get(language, "music", "join_loading")}`);

        const { channel } = interaction.member.voice;
        if(!channel) return msg.edit(`${client.i18n.get(language, "music", "join_voice")}`);

        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            selfDeafen: true,
        });

        await player.connect();

        const embed = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "music", "join_msg", {
                channel: channel.name
            })}`)
            .setColor(client.color)

        msg.edit({ content: " ", embeds: [embed] })
    }
}
