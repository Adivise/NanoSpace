const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "replay",
        aliases: [],
        description: "Replay current song!",
        accessableby: "Member",
        category: "music"
    },
    run: async (client, message) => {
        const msg = await message.channel.send(`**Loading please wait...**`);

        const player = client.music.players.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");

        const { channel } = message.member.voice;
        if(!channel || channel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to use the skip command.");

        player.seek(0);

        const embed = new MessageEmbed()
            .setDescription("\`⏮\` | **Song has been:** `Replay`")
            .setColor('#000001');

        msg.edit('', embed);
            console.log(chalk.magenta(`  [Command]: Replay used by ${message.author.tag} from ${message.guild.name}`));
    }
}