const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const formatDuration = require('../../handlers/formatduration');

module.exports = { 
    config: {
        name: "queue",
        aliases: ["q", "now"],
        description: "Displays what the current queue is.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`**Loading please wait...**`);

        const player = client.music.players.get(message.guild.id);
        if(!player || !player.queue[0]) return msg.edit("No song currently playing in this guild.");

        let index = 1;
        let string = "";

            if(player.queue[0]) string += `__**Currently Playing**__\n **[${player.queue[0].title}](${player.queue[0].uri})** \`${formatDuration(player.queue[0].duration)}\` • ${player.queue[0].requester} \n `;
            if(player.queue[1]) string += `__**Rest of queue:**__\n ${player.queue.slice(1, 10).map(x => `**(${index++}).** **[${x.title}](${x.uri})** \`${formatDuration(x.duration)}\` • ${x.requester}`).join("\n")}`;

        const embed = new MessageEmbed()
            .setAuthor(`Current Queue - ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
            .setDescription(string)
            .setColor('#000001')
            .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        msg.edit('', embed)
            console.log(chalk.magenta(`  [Command]: Queue used by ${message.author.tag} from ${message.guild.name}`));
    }
}