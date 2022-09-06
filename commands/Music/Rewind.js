const { EmbedBuilder } = require('discord.js');
const formatDuration = require('../../structures/FormatDuration.js')

const rewindNum = 10;

module.exports = { 
    config: {
        name: "rewind",
        description: "Rewind timestamp in the song!",
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

        const CurrentDuration = formatDuration(player.position);

        if(args[0] && !isNaN(args[0])) {
			if((player.position - args[0] * 1000) > 0) {
                await player.seek(player.position - args[0] * 1000);
                
                const rewind1 = new EmbedBuilder()
                .setDescription(`\`⏮\` | *Rewind to:* \`${CurrentDuration}\``)
                .setColor(client.color);

                msg.edit({ content: " ", embeds: [rewind1] });
			}
			else {
				return msg.edit(`You can't rewind more than the duration of the song!`);
			}
		}
		else if(args[0] && isNaN(args[0])) {
			return msg.edit(`Please enter a number!`);
		}

		if(!args[0]) {
			if((player.position - rewindNum * 1000) > 0) {
                await player.seek(player.position - rewindNum * 1000);
                
                const rewind2 = new EmbedBuilder()
                .setDescription(`\`⏮\` | *Rewind to:* \`${CurrentDuration}\``)
                .setColor(client.color);

                msg.edit({ content: " ", embeds: [rewind2] });
			}
			else {
				return msg.edit(`You can't rewind more than the duration of the song!`);
			}
		}
	}
};