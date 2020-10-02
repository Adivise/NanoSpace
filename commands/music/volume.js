const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "volume",
        aliases: ["vol", "v"],
        description: "Adjusts the volume of the bot.",
        accessableby: "Member",
        category: "music",
        usage: "<input>"
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`**Loading please wait...**`);

        const player = client.music.players.get(message.guild.id);
        if (!player) return msg.edit("No song/s currently playing within this guild.");

        const { channel } = message.member.voice;
        if (!channel || channel.id !== player.voiceChannel.id) return msg.edit("You need to be in a voice channel to adjust the volume.");

        if (!args[0]) return msg.edit(`Current Volume: ${player.volume}`);
        if (Number(args[0]) <= 0 || Number(args[0]) > 100) return message.author.send("You may only set the volume to 1-100");

        player.setVolume(Number(args[0]));

        const changevol = new MessageEmbed()
            .setDescription(`\`🔊\` | **Change volume to:** \`${args[0]}\``)
            .setColor('#000001');
        
        msg.edit('', changevol);
            console.log(chalk.magenta(`  [Command]: Volume used by ${message.author.tag} from ${message.guild.name}`));
    }
}