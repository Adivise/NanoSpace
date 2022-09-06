const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "previous",
        description: "Previous a song!",
        accessableby: "Member",
        category: "Music"
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Loading please wait....`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`No playing in this guild!`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`I'm not in the same voice channel as you!`);

        if (!player.queue.previous) return msg.edit(`No previous song/s not found`);

        await player.queue.unshift(player.queue.previous);
        await player.stop();

        const embed = new EmbedBuilder()
            .setDescription("`⏮` | *Song has been:* `Previous`")
            .setColor(client.color);

        msg.edit({ content: " ", embeds: [embed] });
    }
}