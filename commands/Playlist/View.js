const { EmbedBuilder } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');
const humanizeDuration = require('humanize-duration');
const { NormalPlaylist } = require('../../structures/PageQueue.js');

module.exports = { 
    config: {
        name: "view",
        description: "View my playlists",
        accessableby: "Premium",
        category: "Playlist",
    },
    run: async (client, message, args, user, language, prefix) => {

		try {
			if (user && user.isPremium) {
        
        const playlists = await Playlist.find({ owner: message.author.id });

        let pagesNum = Math.ceil(playlists.length / 10);
		if(pagesNum === 0) pagesNum = 1;

        const playlistStrings = [];
        for(let i = 0; i < playlists.length; i++) {
            const playlist = playlists[i];
            const created = humanizeDuration(Date.now() - playlists[i].created, { largest: 1 }) //`${i + 1}. **\`${playlist.name}\`** • (${playlist.tracks.length} tracks) • *Created At*: \`[${created}]\``
            playlistStrings.push(
                `${client.i18n.get(language, "playlist", "view_embed_playlist", {
                    num: i + 1,
                    name: playlist.name,
                    tracks: playlist.tracks.length,
                    create: created
                })}
                `);
        }

        const pages = [];
        for (let i = 0; i < pagesNum; i++) {
            const str = playlistStrings.slice(i * 10, i * 10 + 10).join('');
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${client.i18n.get(language, "playlist", "view_embed_title", {
                    user: message.author.username
                })}`, iconURL: message.author.displayAvatarURL() })
                .setDescription(`${str == '' ? '  Nothing' : '\n' + str}`)
                .setColor(client.color)
                .setFooter({ text: `${client.i18n.get(language, "playlist", "view_embed_footer", {
                    page: i + 1,
                    pages: pagesNum,
                    songs: playlists.length
                })}` });

            pages.push(embed);
        }
		if (!args[0]) {
			if (pages.length == pagesNum && playlists.length > 10) NormalPlaylist(client, message, pages, 30000, playlists.length, language);
			else return message.channel.send({ embeds: [pages[0]] });
		}
		else {
			if (isNaN(args[0])) return message.channel.send({ content: `${client.i18n.get(language, "playlist", "view_notnumber")}` });
			if (args[0] > pagesNum) return message.channel.send({ content: `${client.i18n.get(language, "playlist", "view_page_notfound", {
                page: pagesNum
            })}` });
			const pageNum = args[0] == 0 ? 1 : args[0] - 1;
			return message.channel.send({ embeds: [pages[pageNum]] });
        }
    } else {
        const Premiumed = new EmbedBuilder()
            .setAuthor({ name: `${client.i18n.get(language, "nopremium", "premium_author")}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${client.i18n.get(language, "nopremium", "premium_desc")}`)
            .setColor(client.color)
            .setTimestamp()

        return message.channel.send({ content: " ", embeds: [Premiumed] });
      }
    } catch (err) {
        console.log(err)
        message.channel.send({ content: `${client.i18n.get(language, "nopremium", "premium_error")}` })
        }
    }
};