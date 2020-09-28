const chalk = require('chalk');
const { prefix } = require('../../config.json');
const formatDuration = require('../../handlers/formatduration.js')

module.exports = { 
    config: {
        name: "seek",
        aliases: [],
        description: "Seek timestamp in the song!",
        accessableby: "Member",
        category: "music",
        usage: "<seconds>"
    },
    run: async (bot, message, args) => {
        const msg = await message.channel.send(`**Loading please wait...**`);
        if(isNaN(args[0])) return msg.edit(`Invalid number. Please provide a number in seconds.\nCorrect Usage: \`${prefix}seek <seconds>\``);
        
        const player = bot.music.players.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");

        const { voiceChannel } = message.member;
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to use the skip command.");

		if(args[0] * 1000 >= player.playing.length || args[0] < 0) return msg.edit('Cannot seek beyond length of song');
		player.seek(args[0] * 1000);

        const Duration = formatDuration(player.position);

        msg.edit("\`⏭\` | **Seeked to:** "+ `\`${Duration}\``);
            console.log(chalk.magenta(`  [Command]: Seek used by ${message.author.tag} from ${message.guild.name}`));
    }
}