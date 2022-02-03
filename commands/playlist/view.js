const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');
const humanizeDuration = require('humanize-duration');
const { NormalPlaylist } = require('../../structures/PageQueue.js');

module.exports = { 
    config: {
        name: "view",
        aliases: [],
        description: "View my playlists",
        accessableby: "Member",
        category: "playlist",
    },
    run: async (client, message, args, user) => {
        console.log(chalk.magenta(`[COMMAND] View used by ${message.author.tag} from ${message.guild.name}`));

		try {
			if (user && user.isPremium) {
        
        const playlists = await Playlist.find({ owner: message.author.id });
        if(!playlists) return message.channel.send(`**You don't have any playlists!**`);

        let pagesNum = Math.ceil(playlists.length / 10);
		if(pagesNum === 0) pagesNum = 1;

        const playlistStrings = [];
        for(let i = 0; i < playlists.length; i++) {
            const playlist = playlists[i];
            const created = humanizeDuration(Date.now() - playlists[i].created, { largest: 1 })

        playlistStrings.push(`**${i + 1}. \`${playlist.name}\`** • (${playlist.tracks.length} tracks) • *Created At*: \`[${created}]\`
        `);
    }

        const pages = [];
        for (let i = 0; i < pagesNum; i++) {
            const str = playlistStrings.slice(i * 10, i * 10 + 10).join('');
            const embed = new MessageEmbed()
                .setAuthor({ name: `${message.author.tag}'s Playlists`, iconURL: message.author.displayAvatarURL() })
                .setDescription(`${str == '' ? '  Nothing' : '\n' + str}`)
                .setColor('#000001')
                .setFooter({ text: `Page • ${i + 1}/${pagesNum} | ${playlists.length} • Playlists` });

            pages.push(embed);
        }
		if (!args[0]) {
			if (pages.length == pagesNum && playlists.length > 10) NormalPlaylist(client, message, pages, 30000, playlists.length);
			else return message.channel.send({ embeds: [pages[0]] });
		}
		else {
			if (isNaN(args[0])) return message.channel.send('Page must be a number.');
			if (args[0] > pagesNum) return message.channel.send(`There are only ${pagesNum} pages available.`);
			const pageNum = args[0] == 0 ? 1 : args[0] - 1;
			return message.channel.send({ embeds: [pages[pageNum]] });
        }
    } else {
        const Premiumed = new MessageEmbed()
            .setAuthor({ name: "Only Premium!", iconURL: client.user.displayAvatarURL() })
            .setDescription(`*You need to be a premium to use this command.*`)
            .setColor("#000001")
            .setTimestamp()

        return message.channel.send({ embeds: [Premiumed] });
        }
    } catch (err) {
        console.log(err)
        message.channel.send({ content: "Something went wrong, try again later." })
        }
    }
};