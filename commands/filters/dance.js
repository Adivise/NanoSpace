const delay = require('delay');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "dance",
        description: "Turning on dance filter",
        category: "filters",
        accessableby: "Member",
    },

    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "filters", "filter_loading", {
            name: client.commands.get('dance').config.name
            })}`);

            const player = client.manager.get(message.guild.id);
            if(!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
            const { channel } = message.member.voice;
            if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);
    
            const data = {
                op: 'filters',
                guildId: message.guild.id,
                timescale: {
                    speed: 1.25,
                    pitch: 1.25,
                    rate: 1.25
                },
            }
    
            await player.node.send(data);

        const embed = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "filters", "filter_on", {
                name: client.commands.get('dance').config.name
            })}`)
            .setColor('#000001');

        await delay(5000);
        msg.edit({ content: " ", embeds: [embed] });
   }
};