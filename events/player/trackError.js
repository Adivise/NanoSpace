const { MessageEmbed } = require("discord.js");

module.exports = async (client, player, track, payload) => {

    console.error(payload.error);

    const channel = client.channels.cache.get(player.textChannel);
    const embed = new MessageEmbed()
        .setColor("RED")
        .setDescription("\`❌\` | Song has error, auto leaving...`");

    channel.send({ embeds: [embed] });

    console.log(`[ERROR] Error when loading song! Track is error in [${player.guild}]`);
    if (!player.voiceChannel) player.destroy();

}