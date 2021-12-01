const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "loopall",
        aliases: ["repeatall", 'lq', 'loopqueue'],
        description: "loop the song in queue playing.",
        accessableby: "Member",
        category: "music"
    },
    run: async (client, message, args) => {
		const msg = await message.channel.send('Loading please wait...');

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

		if (player.queueRepeat === true) {
            player.setQueueRepeat(false)
            
            const unloopall = new MessageEmbed()
                .setDescription(`\`🔁\` | **Song is unloop:** \`All\``)
                .setColor('#000001');

                msg.edit({ content: ' ', embeds: [unloopall] });
                console.log(chalk.magenta(`[COMMAND] Unloopall used by ${message.author.tag} from ${message.guild.name}`));
		}
		else {
            player.setQueueRepeat(true);
            
            const loopall = new MessageEmbed()
                .setDescription(`\`🔁\` | **Song is loop:** \`All\``)
                .setColor('#000001');

                msg.edit({ content: ' ', embeds: [loopall] });
                console.log(chalk.magenta(`[COMMAND] Loopall used by ${message.author.tag} from ${message.guild.name}`));
		}
	}
};