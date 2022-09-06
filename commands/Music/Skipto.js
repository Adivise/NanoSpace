const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "skipto",
        aliases: ["jump", "st"],
        description: "Skips to a certain song in the queue.",
        accessableby: "Member",
        category: "Music",
        usage: "<positions>"
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Loading please wait....`);

        if (isNaN(args[0])) return msg.edit(`Please enter a valid position!`);
		if (args[0] === 0) return msg.edit(`You can't skip to the first song!`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`No playing in this guild!`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`I'm not in the same voice channel as you!`);

		if ((args[0] > player.queue.length) || (args[0] && !player.queue[args[0] - 1])) return msg.edit(`You can't skip to a song that doesn't exist!`);
		if (args[0] == 1) player.stop();

		await player.queue.splice(0, args[0] - 1);
        await player.stop();
        
        const skipto = new EmbedBuilder()
            .setDescription(`\`⏭\` | *Skip to:* \`${args[0]}\``)
            .setColor(client.color);

        msg.edit({ content: " ", embeds: [skipto] });
    }
}