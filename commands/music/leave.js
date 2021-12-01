const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "leave",
        aliases: ["lev", "stop", "dc"],
        description: "Makes the bot leave the voice channel.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`**Loading please wait...**`);

        const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        await player.destroy();

        const embed = new MessageEmbed()
            .setDescription(`\`🚫\` | **Leaved:** | \`${channel.name}\``)
            .setColor('#000001');

        msg.edit({ content: " ", embeds: [embed] })
    }
}
