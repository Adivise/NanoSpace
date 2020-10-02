const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "resume",
        aliases: ["r"],
        description: "Makes the bot pause/resume the music currently playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send('Loading please wait...');

        const player = client.music.players.get(message.guild.id);
        if (!player) return msg.edit("No song/s currently playing in this guild.");

        const { channel } = message.member.voice;
        if (!channel || channel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to pause music.");
        
        player.pause(player.playing);

        const embed = new MessageEmbed()
            .setDescription(`\`⏯\` | **Song has been:** \`${player.playing ? "Resumed" : "Paused"}\``)
            .setColor('#000001');

        msg.edit('', embed);
            console.log(chalk.magenta(`  [Command]: ${player.playing ? "Resumed" : "Paused"} used by ${message.author.tag} from ${message.guild.name}`))
    }
}