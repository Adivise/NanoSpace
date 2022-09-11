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
    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "skipto_loading")}`);

        if (isNaN(args[0])) return msg.edit(`${client.i18n.get(language, "music", "skipto_invalid_position")}`);
		if (args[0] === 0) return msg.edit(`${client.i18n.get(language, "music", "skipto_arg", {
            prefix: prefix
        })}`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

		if ((args[0] > player.queue.length) || (args[0] && !player.queue[args[0] - 1])) return msg.edit(`${client.i18n.get(language, "music", "skipto_invalid")}`);
		if (args[0] == 1) player.stop();

		await player.queue.splice(0, args[0] - 1);
        await player.stop();
        await client.clearInterval(client.interval);
        
        const skipto = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "music", "skipto_msg", {
                position: args[0]
            })}`)
            .setColor(client.color);

        msg.edit({ content: " ", embeds: [skipto] });
    }
}