const chalk = require('chalk');

module.exports = { 
    config: {
        name: "queue",
        aliases: ["q", "now"],
        description: "Displays what the current queue is.",
        accessableby: "Member",
        category: "music",
    },
    run: async (bot, message, args) => {
        const msg = await message.channel.send(`**Loading please wait...**`);

        const player = bot.music.players.get(message.guild.id);
        if(!player || !player.queue[0]) return msg.edit("No song currently playing in this guild.");

        let index = 1;
        let string = "";

            if(player.queue[0]) string += `__**Currently Playing**__\n \`${player.queue[0].title}\` - **Requested by ${player.queue[0].requester.username}**. \n`;
            if(player.queue[1]) string += `__**Rest of queue:**__\n ${player.queue.slice(1, 10).map(x => `**[${index++}].** \`${x.title}\` - **Requested by ${x.requester.username}**.`).join("\n")}`;

        msg.edit(`**__Current Queue__** - **__${message.guild.name}__**\n \n${string}`)
            console.log(chalk.magenta(`  [Command]: Queue used by ${message.author.tag} from ${message.guild.name}`));
    }
}