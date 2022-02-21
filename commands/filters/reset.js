const delay = require('delay');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "reset",
        description: "reseting all filters",
        category: "filters",
        accessableby: "Member",
    },

    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "filters", "reset_loading")}`);

		const player = client.manager.get(message.guild.id);
		if(!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
		const { channel } = message.member.voice;
		if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

		const data = {
            op: 'filters',
            guildId: message.guild.id,
        }

        await player.node.send(data);
        await player.setVolume(100);
        
        const resetted = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "filters", "reset_on")}`)
            .setColor('#000001');

        await delay(5000);
        msg.edit({ content: " ", embeds: [resetted] });
   }
};