const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "resume",
        aliases: ["r"],
        description: "Makes the bot pause/resume the music currently playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "resume_loading")}`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);
        
        await player.pause(player.playing);
        const uni = player.paused ? `${client.i18n.get(language, "music", "resume_switch_pause")}` : `${client.i18n.get(language, "music", "resume_switch_resume")}`;

        const embed = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "music", "resume_msg", {
                resume: uni
            })}`)
            .setColor('#000001');

        msg.edit({ content: " ", embeds: [embed] });
    }
}