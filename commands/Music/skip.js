const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "skip",
        aliases: ["next", "s"],
        description: "Skips the song currently playing.",
        accessableby: "Member",
        category: "music"
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`**Loading please wait...**`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        await player.stop();

        const skipped = new MessageEmbed()
            .setDescription("\`⏭\` | **Song has been:** `Skipped`")
            .setColor('#000001');

        msg.edit({ content: " ", embeds: [skipped] });
            console.log(chalk.magenta(`[COMMAND] Skip used by ${message.author.tag} from ${message.guild.name}`));
    }
}