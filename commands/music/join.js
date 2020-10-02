const chalk = require('chalk');

module.exports = { 
    config: {
        name: "join",
        aliases: ["summon"],
        description: "Makes the bot join the voice channel.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`**Loading please wait...**`);

        const { channel } = message.member.voice;

        const player = client.music.players.spawn({
            guild: message.guild,
			selfDeaf: true,
            textChannel: message.channel,
            voiceChannel: channel,
        });

        if(!channel || channel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to use the join command.");

        msg.edit(`\`🔊\` | **Joined:** \`Success\` | ${channel.id}`)
            console.log(chalk.green(`    [Joined]: ${channel.id}`, chalk.yellow`[GuildID]: ${message.guild.id}`));
    }
}
