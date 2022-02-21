const delay = require('delay');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "earrape",
        description: "Destroy your ear!",
        category: "filters",
        accessableby: "Member",
        aliases: ["ear"]
    },

    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "filters", "filter_loading", {
            name: client.commands.get('earrape').config.name
            })}`);

            const player = client.manager.get(message.guild.id);
            if(!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
            const { channel } = message.member.voice;
            if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);
    
		await player.setVolume(500);
        const data = {
            op: 'filters',
            guildId: message.guild.id,
        }
        await player.node.send(data);

        const earrapped = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "filters", "filter_on", {
                name: client.commands.get('earrape').config.name
            })}`)
            .setColor('#000001');

        await delay(3000);
        msg.edit({ content: " ", embeds: [earrapped] });
    }
};