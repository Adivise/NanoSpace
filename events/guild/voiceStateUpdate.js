module.exports = async (client, oldState, newState) => {
	const player = client.manager?.players.get(newState.guild.id);
	if (!player) return;
    
    // Destroy player when got disconnect!
	if (!newState.guild.members.cache.get(client.user.id).voice.channelId) player.destroy();
};