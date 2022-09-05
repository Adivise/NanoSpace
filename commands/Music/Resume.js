const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "resume",
        aliases: ["r"],
        description: "Makes the bot pause/resume the music currently playing.",
        accessableby: "Member",
        category: "Music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Loading please wait....`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`No playing in this guild!`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`I'm not in the same voice channel as you!`);
        
        await player.pause(player.playing);
        const uni = player.paused ? `Paused` : `Resumed`;

        const embed = new EmbedBuilder()
            .setDescription(`\`⏯\` | *Song has been:* \`${uni}\``)
            .setColor(client.color);

        msg.edit({ content: " ", embeds: [embed] });
    }
}