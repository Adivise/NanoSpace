const { PermissionsBitField } = require("discord.js");

module.exports = async (client, oldState, newState) => {
	const player = client.manager?.players.get(newState.guild.id);

	if (!player) return;
	if (!newState.guild.members.cache.get(client.user.id).voice.channelId) player.destroy();

	if (newState.channelId && newState.channel.type == "GUILD_STAGE_VOICE" && newState.guild.members.me.voice.suppress) {
		if (newState.guild.members.me.permissions.has(PermissionsBitField.Flags.Speak) || (newState.channel && newState.channel.permissionsFor(nS.guild.members.me).has(PermissionsBitField.Flags.Speak))) {
			newState.guild.members.me.voice.setSuppressed(false);
		}
	}

	if (oldState.id === client.user.id) return;
	if (!oldState.guild.members.cache.get(client.user.id).voice.channelId) return;

	if (player.twentyFourSeven) return;

	if (oldState.guild.members.cache.get(client.user.id).voice.channelId === oldState.channelId) {
		if (oldState.guild.me.voice?.channel && oldState.guild.members.me.voice.channel.members.filter((m) => !m.user.bot).size === 0) {

			await delay(client.config.LEAVE_TIMEOUT);
			const vcMembers = oldState.guild.members.me.voice.channel?.members.size;
			if (!vcMembers || vcMembers === 1) {
			const newPlayer = client.manager?.players.get(newState.guild.id)
			newPlayer ? player.destroy() : oldState.guild.members.me.voice.channel.leave();
			}
		}
	}
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}