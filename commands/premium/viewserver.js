const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const Premium = require('../../settings/models/PremiumGuild.js');
const humanizeDuration = require('humanize-duration');
const { NormalGuildCount } = require('../../structures/PageQueue.js');

module.exports = { 
    config: {
        name: "viewserver",
        aliases: ["viewguild"],
        description: "View premium servers",
        accessableby: "Owner",
        category: "premium",
    },
    run: async (client, message, args) => {
        if(message.author.id != client.owner) return message.channel.send("You're NOT the client owner!")
        console.log(chalk.magenta(`[COMMAND] Viewserver used by ${message.author.tag} from ${message.guild.name}`));

        const premium = await Premium.find({});
        if(!premium) return message.channel.send(`**There are no premium servers!**`);

        let pagesNum = Math.ceil(premium.length / 10);
		if(pagesNum === 0) pagesNum = 1;

        const premiumStrings = [];
        for(let i = 0; i < premium.length; i++) {
            const premiums = premium[i];
            const created = humanizeDuration(Date.now() - premium[i].created, { largest: 1 })

        premiumStrings.push(`• ** ${client.guilds.cache.get(premiums.guild).name} ** (${client.guilds.cache.get(premiums.guild).id}) | Since: \`[${created} ago.]\`
        `);
    }

    const pages = [];
    for (let i = 0; i < pagesNum; i++) {
        const str = premiumStrings.slice(i * 10, i * 10 + 10).join('');
        const embed = new MessageEmbed()
            .setAuthor({ name: `Premium's Server`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${str == '' ? '  **There are no premium servers!**' : '\n' + str}`)
            .setColor('#000001')
            .setFooter({ text: `Page • ${i + 1}/${pagesNum} | ${premium.length} • Total servers` });

        pages.push(embed);
    }
    if (!args[0]) {
        if (pages.length == pagesNum && premium.length > 10) NormalGuildCount(client, message, pages, 30000, premium.length);
        else return message.channel.send({ embeds: [pages[0]] });
    }
    else {
        if (isNaN(args[0])) return message.channel.send('Page must be a number.');
        if (args[0] > pagesNum) return message.channel.send(`There are only ${pagesNum} pages available.`);
        const pageNum = args[0] == 0 ? 1 : args[0] - 1;
        return message.channel.send({ embeds: [pages[pageNum]] });
    }
}
};
