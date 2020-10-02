const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "shuffle",
        aliases: ["mix"],
        description: "Shuffle song in queue!",
        accessableby: "Member",
        category: "music"
    },
    run: async (client, message) => {
        const msg = await message.channel.send(`**Loading please wait...**`);

        const player = client.music.players.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");

        const { channel } = message.member.voice;
        if(!channel || channel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to use the skip command.");

		player.queue.shuffle();

        const shuffle = new MessageEmbed()
            .setDescription("\`🔀\` | **Queue has been:** `Shuffle`")
            .setColor('#000001');
        
        msg.edit('', shuffle);
            console.log(chalk.magenta(`  [Command]: Shuffle used by ${message.author.tag} from ${message.guild.name}`));
    }
}