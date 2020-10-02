const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "clear",
        aliases: [],
        description: "Clear song in queue!",
        accessableby: "Member",
        category: "music",
        usage: "<input>"
    },
    run: async (client, message) => {
        const msg = await message.channel.send(`**Loading please wait...**`);

        const player = client.music.players.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");

        const { channel } = message.member.voice;
        if(!channel || channel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to use the skip command.");

        player.queue.clear();
        
        const cleared = new MessageEmbed()
            .setDescription("\`📛\` | **Queue has been:** `Cleared`")
            .setColor('#000001');

        msg.edit('', cleared);
            console.log(chalk.magenta(`  [Command]: Clear used by ${message.author.tag} from ${message.guild.name}`));
    }
}