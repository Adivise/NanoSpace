const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "247",
        aliases: [],
        description: "make 24/7 in voice channel!",
        accessableby: "Member",
        category: "music",
        usage: "<input>"
    },
    run: async (client, message) => {
        const msg = await message.channel.send(`**Loading please wait...**`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.");

        if (player.twentyFourSeven) {
            player.twentyFourSeven = false;
            const off = new MessageEmbed()
            .setDescription("\`🌙\` | **Mode 24/7 has been:** `Disabled`")
            .setColor('#000001');

            msg.edit({ content: " ", embeds: [off] });
            console.log(chalk.magenta(`[COMMAND] 24/7 used by ${message.author.tag} from ${message.guild.name}`));
        } else {
            player.twentyFourSeven = true;
            const on = new MessageEmbed()
            .setDescription("\`🌕\` | **Mode 24/7 has been:** `Enabled`")
            .setColor('#000001');

            msg.edit({ content: " ", embeds: [on] });
            console.log(chalk.magenta(`[COMMAND] 24/7 used by ${message.author.tag} from ${message.guild.name}`));
        }
    }
}