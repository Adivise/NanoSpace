const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "join",
        aliases: ["summon"],
        description: "Makes the bot join the voice channel.",
        accessableby: "Member",
        category: "Music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Loading please wait....`);

        const { channel } = message.member.voice;
        if(!channel) return msg.edit(`You are not in a voice channel`);

        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: true,
        });

        await player.connect();

        const embed = new EmbedBuilder()
            .setDescription(`\`🔊\` | *Joined:* \`${channel.name}\``)
            .setColor(client.color)

        msg.edit({ content: " ", embeds: [embed] })
    }
}
