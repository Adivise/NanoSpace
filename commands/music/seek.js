const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../config.json');
const formatDuration = require('../../structures/formatduration.js')

module.exports = { 
    config: {
        name: "seek",
        aliases: [],
        description: "Seek timestamp in the song!",
        accessableby: "Member",
        category: "music",
        usage: "<seconds>"
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`**Loading please wait...**`);
        if(isNaN(args[0])) return msg.edit(`Invalid number. Please provide a number in seconds.\nCorrect Usage: \`${PREFIX}seek <seconds>\``);
        
		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

		if(args[0] * 1000 >= player.playing.length || args[0] < 0) return msg.edit('Cannot seek beyond length of song');
		await player.seek(args[0] * 1000);

        const Duration = formatDuration(player.position);

        const seeked = new MessageEmbed()
            .setDescription("\`⏭\` | **Seeked to:** "+ `\`${Duration}\``)
            .setColor('#000001');

        msg.edit({ content: ' ', embeds: [seeked] });
            console.log(chalk.magenta(`[COMMAND] Seek used by ${message.author.tag} from ${message.guild.name}`));
    }
}