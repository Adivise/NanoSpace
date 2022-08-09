const { EmbedBuilder } = require("discord.js");
const { white, red } = require("chalk");

module.exports = async (client, player, track, payload) => {

    console.error(payload.error);

    const channel = client.channels.cache.get(player.textChannel);
    if (!channel) return;

    const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription("`❌` | *Song has error:* `Auto-Skipped`");

    channel.send({ embeds: [embed] });

    console.log(white('[') + red('DEBUG') + white('] ') + red('Track Error in ') + white(player.guild) + red(' Auto-Leaved!'));
    if (!player.voiceChannel) player.destroy();

}