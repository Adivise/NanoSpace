const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
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
    run: async (client, message, args) => {
        const msg = await message.channel.send("Loading please wait...")

        if (isNaN(args[0])) return msg.edit('Invalid number');
		if (args[0] === 0) return msg.edit(`Cannot skip to a song that is already playing. To skip the current playing song type: \`${prefix}skip\``);

        const player = client.music.players.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");

        const { channel } = message.member.voice;
        if(!channel || channel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to use the skip command.");

		if ((args[0] > player.queue.length) || (args[0] && !player.queue[args[0] - 1])) return msg.edit('Song not found');
		if (args[0] == 1) player.stop();
		player.queue.splice(0, args[0] - 1);
        player.stop();
        
        const skipto = new MessageEmbed()
            .setDescription("\`⏭\` | **Song has been:** " + `\`Skipto\``)
            .setColor('#000001');

        msg.edit('', skipto);
            console.log(chalk.magenta(`  [Command]: Skipto used by ${message.author.tag} from ${message.guild.name}`));
    }
}