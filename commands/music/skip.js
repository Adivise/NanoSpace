const chalk = require('chalk');

module.exports = { 
    config: {
        name: "skip",
        aliases: ["next", "s"],
        description: "Skips the song currently playing.",
        accessableby: "Member",
        category: "music"
    },
    run: async (bot, message, args) => {
        const msg = await message.channel.send(`**Loading please wait...**`);

        const player = bot.music.players.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");

        const { voiceChannel } = message.member;
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to use the skip command.");

        player.stop();

        msg.edit("\`⏭\` | **Song has been:** `Skipped`")
            console.log(chalk.magenta(`  [Command]: Skip used by ${message.author.tag} from ${message.guild.name}`));
    }
}