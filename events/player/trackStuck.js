const { EmbedBuilder } = require("discord.js");

module.exports = async (client, player, track, payload) => {
    const channel = client.channels.cache.get(player.textChannel);
    if (!channel) return;

    const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription("`❌` | *Song has stuck:* `Auto-Skipped`");

    channel.send({ embeds: [embed] });
    if (!player.voiceChannel) player.destroy();

}