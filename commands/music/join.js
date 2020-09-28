const chalk = require('chalk');

module.exports = { 
    config: {
        name: "join",
        aliases: ["summon"],
        description: "Makes the bot join the voice channel.",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
        const msg = await message.channel.send(`**Loading please wait...**`);

        const { voiceChannel } = message.member;

        const player = bot.music.players.spawn({
            guild: message.guild,
			selfDeaf: true,
            textChannel: message.channel,
            voiceChannel
        });

        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to use the join command.");

        msg.edit(`\`🔊\` | **Joined:** \`Success\` | ${voiceChannel.id}`)
            console.log(chalk.green(`    [Joined]: ${voiceChannel.id}`, chalk.yellow`[GuildID]: ${message.guild.id}`));
    }
}
