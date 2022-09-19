const { EmbedBuilder } = require("discord.js");
const { convertTime } = require("../../structures/ConvertTime.js");

module.exports = { 
    config: {
        name: "removetrack",
        description: "Remove song from queue!",
        usage: "<number>",
        category: "Music",
        accessableby: "Member",
        aliases: ["rt", "rs"],
    },
    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "removetrack_loading")}`);
        
		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

        const tracks = args[0];

        if (isNaN(tracks)) return msg.edit(`${client.i18n.get(language, "music", "removetrack_arg")}`);

        if (tracks == 0) return msg.edit(`${client.i18n.get(language, "music", "removetrack_already")}`);
        if (tracks > player.queue.length) return msg.edit(`${client.i18n.get(language, "music", "removetrack_notfound")}`);

        const song = player.queue[tracks - 1];

        player.queue.splice(tracks - 1, 1);

        const embed = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "music", "removetrack_desc", {
                name: song.title,
                url: song.uri,
                duration: convertTime(song.duration, true),
                request: song.requester
            })
        }`)

        return msg.edit({ content: " ", embeds: [embed] });
    }
}