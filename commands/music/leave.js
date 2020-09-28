const chalk = require('chalk');

module.exports = { 
    config: {
        name: "leave",
        aliases: ["lev", "stop", "dc"],
        description: "Makes the bot leave the voice channel.",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
        const msg = await message.channel.send(`**Loading please wait...**`);

        const { voiceChannel } = message.member;
        const player = bot.music.players.get(message.guild.id);

        if(!player) return msg.edit("No song/s currently playing in this guild.");
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to use the leave command.");

        bot.music.players.destroy(message.guild.id);
        msg.edit(`\`🚫\` | **Leaved:** \`Success\` | ${voiceChannel.id}`)
                console.log(chalk.red(`    [Leaved]: ${voiceChannel.id}`, chalk.yellow(`[GuildID]: ${message.guild.id}`)));
    }
}
