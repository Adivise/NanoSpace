const delay = require('delay');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "doubletime",
        description: "Turning on doubletime filter",
        category: "filters",
        accessableby: "Member",
    },

    run: async (client, message, args, language) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "filters", "filter_loading", {
            name: client.commands.get('doubletime').config.name
            })}`);

            const player = client.manager.get(message.guild.id);
            if(!player) return message.channel.send(`${client.i18n.get(language, "noplayer", "no_player")}`);
            const { channel } = message.member.voice;
            if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send(`${client.i18n.get(language, "noplayer", "no_voice")}`);
    
            const data = {
                op: 'filters',
                guildId: message.guild.id,
                timescale: {
                    speed: 1.165,
                },
            }
    
            await player.node.send(data);

        const embed = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "filters", "filter_on", {
                name: client.commands.get('doubletime').config.name
            })}`)
            .setColor('#000001');

        await delay(5000);
        msg.edit({ content: " ", embeds: [embed] });
   }
};