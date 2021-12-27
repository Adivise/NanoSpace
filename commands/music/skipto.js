const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../config.json')

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
		if (args[0] === 0) return msg.edit(`Cannot skip to a song that is already playing. To skip the current playing song type: \`${PREFIX}skip\``);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

		if ((args[0] > player.queue.length) || (args[0] && !player.queue[args[0] - 1])) return msg.edit('Song not found');
		if (args[0] == 1) player.stop();
		await player.queue.splice(0, args[0] - 1);
        await player.stop();
        
        const skipto = new MessageEmbed()
            .setDescription("\`⏭\` | **Song has been:** " + `\`Skipto\``)
            .setColor('#000001');

        msg.edit({ content: " ", embeds: [skipto] });
            console.log(chalk.magenta(`[COMMAND] Skipto used by ${message.author.tag} from ${message.guild.name}`));
    }
}