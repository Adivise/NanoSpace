const delay = require('delay');
const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "3d",
        description: "Turning on 3d filter",
        category: "Filters",
        accessableby: "Member",
    },

    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "filters", "filter_loading", {
            name: client.commands.get('3d').config.name
        })}`);

            const player = client.manager.get(message.guild.id);
            if(!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
            const { channel } = message.member.voice;
            if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

            const data = {
                op: 'filters',
                guildId: message.guild.id,
                rotation: { rotationHz: 0.2 }
            }

            await player.node.send(data);

        const embed = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "filters", "filter_on", {
                name: client.commands.get('3d').config.name
            })}`)
            .setColor(client.color);

        await delay(5000);
        msg.edit({ content: " ", embeds: [embed] });
   }
};