const delay = require('delay');
const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "reset",
        description: "reseting all filters",
        category: "Filters",
        accessableby: "Member",
    },

    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "filters", "reset_loading")}`);

		const player = client.manager.get(message.guild.id);
		if(!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
		const { channel } = message.member.voice;
		if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

		const data = {
            op: 'filters',
            guildId: message.guild.id,
        }

        await player.node.send(data);
        await player.setVolume(100);
        
        const resetted = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "filters", "reset_on")}`)
            .setColor(client.color);

        await delay(5000);
        msg.edit({ content: " ", embeds: [resetted] });
   }
};