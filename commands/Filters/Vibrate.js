const delay = require('delay');
const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "vibrate",
        description: "Turning on vibrate filter",
        category: "Filters",
        accessableby: "Member",
    },

    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "filters", "filter_loading", {
            name: client.commands.get('vibrate').config.name
            })}`);

            const player = client.manager.get(message.guild.id);
            if(!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
            const { channel } = message.member.voice;
            if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

            const data = {
                op: 'filters',
                guildId: message.guild.id,
                vibrato: {
                    frequency: 4.0,
                    depth: 0.75
                },
                tremolo: {
                    frequency: 4.0,
                    depth: 0.75
                },
            }

            await player.node.send(data);

        const embed = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "filters", "filter_on", {
                name: client.commands.get('vibrate').config.name
            })}`)
            .setColor(client.color);

        await delay(5000);
        msg.edit({ content: " ", embeds: [embed] });
   }
};