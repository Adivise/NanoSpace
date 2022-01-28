const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');
const humanizeDuration = require('humanize-duration');
const { NormalPlaylist } = require('../../structures/PageQueue.js');

module.exports = { 
    config: {
        name: "viewall",
        aliases: [],
        description: "View all public's playlists",
        accessableby: "Owner",
        category: "playlist",
    },
    run: async (client, message, args) => {
        if(message.author.id != client.owner) return message.channel.send("You're the client the owner!")
        console.log(chalk.magenta(`[COMMAND] Viewall used by ${message.author.tag} from ${message.guild.name}`));
        
        const playlists = await Playlist.find({});
        if(!playlists) return message.channel.send(`**Don't have any playlists!**`);

        let pagesNum = Math.ceil(playlists.length / 10);
		if(pagesNum === 0) pagesNum = 1;

        const playlistStrings = [];
        for(let i = 0; i < playlists.length; i++) {
            const playlist = playlists[i];
            const created = humanizeDuration(Date.now() - playlists[i].created, { largest: 1 })

        playlistStrings.push(`**\`${playlist.name}\`** • (${playlist.tracks.length} tracks) | Release: \`[${created} ago.]\` By: ${client.users.cache.get(playlist.owner).tag}
        `);
    }

        const pages = [];
        for (let i = 0; i < pagesNum; i++) {
            const str = playlistStrings.slice(i * 10, i * 10 + 10).join('');
            const embed = new MessageEmbed()
                .setAuthor({ name: `Public's Playlist`, iconURL: client.user.displayAvatarURL() })
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
    }
};