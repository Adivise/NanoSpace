const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "clear",
        description: "Clear song in queue!",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args, language) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "clearqueue_loading")}`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

        await player.queue.clear();
        
        const cleared = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "music", "clearqueue_msg")}`)
            .setColor('#000001');

        msg.edit({ content: " ", embeds: [cleared] });
    }
}