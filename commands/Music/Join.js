const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "join",
        aliases: ["summon"],
        description: "Makes the bot join the voice channel.",
        accessableby: "Member",
        category: "Music",
    },
    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "join_loading")}`);

        const { channel } = message.member.voice;
        if(!channel) return msg.edit(`${client.i18n.get(language, "music", "join_voice")}`);

        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: true,
        });

        await player.connect();

        const embed = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "music", "join_msg", {
                channel: channel.name
            })}`)
            .setColor(client.color)

        msg.edit({ content: " ", embeds: [embed] })
    }
}
