const { EmbedBuilder } = require("discord.js");

module.exports = async (client, player, track, payload) => {

    console.error(payload.error);

    const channel = client.channels.cache.get(player.textChannel);
    if (!channel) return;

    const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription("`❌` | *Song has error:* `Auto-Skipped`");

    channel.send({ embeds: [embed] });
    if (!player.voiceChannel) player.destroy();

}