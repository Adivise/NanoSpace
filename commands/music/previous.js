const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "previous",
        aliases: [],
        description: "Previous a song!",
        accessableby: "Member",
        category: "music"
    },
    run: async (client, message) => {
        const msg = await message.channel.send(`**Loading please wait...**`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        if (!player.queue.previous) return msg.edit("No previous song/s found.");

        await player.queue.unshift(player.queue.previous);
        await player.stop();

        const embed = new MessageEmbed()
            .setDescription("\`⏮\` | **Song has been:** `Previous`")
            .setColor('#000001');

        msg.edit({ content: " ", embeds: [embed] });
            console.log(chalk.magenta(`[COMMAND] Previous used by ${message.author.tag} from ${message.guild.name}`));
    }
}