const { MessageEmbed } = require("discord.js");
const delay = require("delay");

module.exports = async (client, oldState, newState) => {
		const player = client.manager?.players.get(newState.guild.id);

		if (!player) return;
		if (!newState.guild.members.cache.get(client.user.id).voice.channelId) player.destroy();

		if (oldState.id === client.user.id) return;
		if (!oldState.guild.members.cache.get(client.user.id).voice.channelId) return;

		if (player.twentyFourSeven) return;
    	const leaveEmbed = client.channels.cache.get(player.textChannel);

		if (oldState.guild.members.cache.get(client.user.id).voice.channelId === oldState.channelId) {
			if (oldState.guild.me.voice?.channel && oldState.guild.me.voice.channel.members.filter((m) => !m.user.bot).size === 0) {
				const vcRoom = oldState.guild.me.voice.channel.id;
        const EmptyEmbed = new MessageEmbed()
            .setColor("#000001")
            .setDescription(`**Disconnecting <#${vcRoom}> in ${client.config.LEAVE_TIMEOUT / 60 / 1000} minutes because I was left alone.**`)

        if (leaveEmbed) leaveEmbed.send({ embeds: [EmptyEmbed] });
				await delay(client.config.LEAVE_TIMEOUT);

				const vcMembers = oldState.guild.me.voice.channel?.members.size;
				if (!vcMembers || vcMembers === 1) {
					const newPlayer = client.manager?.players.get(newState.guild.id)
            newPlayer ? player.destroy() : oldState.guild.me.voice.channel.leave();

					const TimeoutEmbed = new MessageEmbed(client, newState.guild)
            .setDescription(`**Disconnecting from <#${vcRoom}> because I was left alone.**`);
					try {
						if (leaveEmbed) leaveEmbed.send({ embeds: [TimeoutEmbed] });
					} catch (error) {
            console.log(error);
          }
				}
			}
		}
};