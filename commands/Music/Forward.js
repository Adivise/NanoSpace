const { EmbedBuilder } = require('discord.js');
const formatDuration = require('../../structures/FormatDuration.js')

const fastForwardNum = 10;

module.exports = { 
    config: {
        name: "forward",
        description: "Forward timestamp in the song!",
        accessableby: "Member",
        category: "Music",
        usage: "<seconds>"
    },

    run: async (client, message, args) => {
        const msg = await message.channel.send(`Loading please wait....`);
           
		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`No playing in this guild!`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`I'm not in the same voice channel as you!`);

        const song = player.queue.current;
        const CurrentDuration = formatDuration(player.position);

		if (args[0] && !isNaN(args[0])) {
			if((player.position + args[0] * 1000) < song.duration) {

                player.seek(player.position + args[0] * 1000);
                
                const forward1 = new EmbedBuilder()
                .setDescription(`\`⏭\` | *Forward to:* \`${CurrentDuration}\``)
                .setColor(client.color);

                msg.edit({ content: " ", embeds: [forward1] });

			} else { 
                return msg.edit(`You can't forward more than the duration of the song!`);
            }
		}
		else if (args[0] && isNaN(args[0])) { 
            return message.reply(`Please enter a number!`);
        }

		if (!args[0]) {
			if((player.position + fastForwardNum * 1000) < song.duration) {
                player.seek(player.position + fastForwardNum * 1000);
                
                const forward2 = new EmbedBuilder()
                .setDescription(`\`⏭\` | *Forward to:* \`${CurrentDuration}\``)
                .setColor(client.color);

                msg.edit({ content: " ", embeds: [forward2] });

			} else {
				return msg.edit(`You can't forward more than the duration of the song!`);
			}
		}
	}
};