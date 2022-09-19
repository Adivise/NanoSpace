const { EmbedBuilder } = require("discord.js");
const { convertTime } = require("../../structures/ConvertTime.js");

module.exports = { 
    config: {
        name: "move",
        description: "Move position song in queue!",
        usage: "<3 1>",
        category: "Music",
        accessableby: "Member"
    },
    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "move_loading")}`);
        
		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

        const tracks = args[0];
        const position = args[1];

        if (isNaN(tracks) || isNaN(position)) return msg.edit(`${client.i18n.get(language, "music", "move_arg")}`);

        if (tracks == 0 && position == 0) return msg.edit(`${client.i18n.get(language, "music", "move_already")}`);
        if (tracks > player.queue.length || (tracks && !player.queue[tracks - 1])) return msg.edit(`${client.i18n.get(language, "music", "move_notfound")}`);
        if ((position > player.queue.length) || !player.queue[position - 1]) return msg.edit(`${client.i18n.get(language, "music", "move_notfound")}`);

        const song = player.queue[tracks - 1];

        player.queue.splice(tracks - 1, 1);
        player.queue.splice(position - 1, 0, song);

        const embed = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "music", "move_desc", {
                name: song.title,
                url: song.uri,
                pos: position
            })
        }`)

        return msg.edit({ content: " ", embeds: [embed] });
    }
}