const chalk = require('chalk');

module.exports = { 
    config: {
        name: "resume",
        aliases: ["r"],
        description: "Makes the bot pause/resume the music currently playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
        const msg = await message.channel.send('Loading please wait...');

        const player = bot.music.players.get(message.guild.id);
        if (!player) return msg.edit("No song/s currently playing in this guild.");

        const { voiceChannel } = message.member;
        if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to pause music.");
        
        player.pause(player.playing);

        msg.edit(`\`⏯\` | **Song has been:** \`${player.playing ? "Resumed" : "Paused"}\``)
            console.log(chalk.magenta(`  [Command]: ${player.playing ? "Resumed" : "Paused"} used by ${message.author.tag} from ${message.guild.name}`))
    }
}