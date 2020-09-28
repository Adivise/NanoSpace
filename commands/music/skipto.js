const chalk = require('chalk');
const { prefix } = require('../../config.json')

module.exports = { 
    config: {
        name: "skipto",
        aliases: ["jump", "st"],
        description: "Skips to a certain song in the queue.",
        accessableby: "Member",
        category: "music",
        usage: "<positions>"
    },
    run: async (bot, message, args) => {
        const msg = await message.channel.send("Loading please wait...")

        if (isNaN(args[0])) return msg.edit('Invalid number');
		if (args[0] === 0) return msg.edit(`Cannot skip to a song that is already playing. To skip the current playing song type: \`${prefix}skip\``);

        const player = bot.music.players.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");

        const { voiceChannel } = message.member;
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to use the skip command.");

		if ((args[0] > player.queue.length) || (args[0] && !player.queue[args[0] - 1])) return msg.edit('Song not found');
		const { title } = player.queue[args[0] - 1];
		if (args[0] == 1) player.stop();
		player.queue.splice(0, args[0] - 1);
		player.stop();

        msg.edit("\`⏭\` | **Song has been:** " + `\`Skipto | ${title}\``)
            console.log(chalk.magenta(`  [Command]: Skipto used by ${message.author.tag} from ${message.guild.name}`));
    }
}