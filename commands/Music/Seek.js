const { EmbedBuilder } = require('discord.js');
const formatDuration = require('../../structures/FormatDuration.js')

module.exports = { 
    config: {
        name: "seek",
        description: "Seek timestamp in the song!",
        accessableby: "Member",
        category: "Music",
        usage: "<seconds>"
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Loading please wait....`);
        if(isNaN(args[0])) return msg.edit(`Please enter a number!`);
        
		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`No playing in this guild!`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`I'm not in the same voice channel as you!`);

		if(args[0] * 1000 >= player.playing.length || args[0] < 0) return msg.edit(`You can't seek more than the duration of the song!`);
		await player.seek(args[0] * 1000);

        const Duration = formatDuration(player.position);

        const seeked = new EmbedBuilder()
            .setDescription(`\`⏮\` | *Seek to:* \`${Duration}\``)
            .setColor(client.color);

        msg.edit({ content: ' ', embeds: [seeked] });
    }
}