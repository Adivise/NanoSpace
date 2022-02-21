const { MessageEmbed } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');
const formatDuration = require('../../structures/formatduration');
const { NormalPage } = require('../../structures/PageQueue.js');

module.exports = { 
    config: {
        name: "detail",
        usage: "<playlist name> <page number>",
        description: "Detail a playlist",
        accessableby: "Member",
        category: "playlist",
    },
    run: async (client, message, args, user, language, prefix) => {

        try {
            if (user && user.isPremium) {
            if(!args[0]) return message.channel.send(`${client.i18n.get(language, "playlist", "detail_arg", {
                prefix: prefix
                })}`);

        const Plist = args.join(" ").replace(/_/g, ' ');
        const playlist = await Playlist.findOne({ name: Plist });
        if(!playlist) return message.channel.send(`${client.i18n.get(language, "playlist", "detail_notfound")}`);
        if(playlist.owner !== message.author.id) return message.channel.send(`${client.i18n.get(language, "playlist", "detail_owner")}`);

        let pagesNum = Math.ceil(playlist.tracks.length / 10);
		if(pagesNum === 0) pagesNum = 1;

        const playlistStrings = [];
        for(let i = 0; i < playlist.tracks.length; i++) {
            const playlists = playlist.tracks[i];
            playlistStrings.push(
                `${i + 1}. **[${playlists.title}](${playlists.uri})** | Author: ${playlists.author} • \`[${formatDuration(playlists.duration)}]\`
                `);
        }

        const totalDuration = formatDuration(playlist.tracks.reduce((acc, cur) => acc + cur.duration, 0));

        const pages = [];
        for (let i = 0; i < pagesNum; i++) {
            const str = playlistStrings.slice(i * 10, i * 10 + 10).join('');
            const embed = new MessageEmbed() //${playlist.name}'s Playlists
                .setAuthor({ name: `${client.i18n.get(language, "playlist", "detail_embed_title", {
                    name: playlist.name
                })}`, iconURL: message.author.displayAvatarURL() })
                .setDescription(`${str == '' ? '  Nothing' : '\n' + str}`)
                .setColor('#000001') //Page • ${i + 1}/${pagesNum} | ${playlist.tracks.length} • Songs | ${totalDuration} • Total duration
                .setFooter({ text: `${client.i18n.get(language, "playlist", "detail_embed_footer", {
                    page: i + 1,
                    pages: pagesNum,
                    songs: playlist.tracks.length,
                    duration: totalDuration
                })}` });

            pages.push(embed);
        }
		if (!args[1]) {
			if (pages.length == pagesNum && playlist.tracks.length > 10) NormalPage(client, message, pages, 60000, playlist.tracks.length, totalDuration);
			else return message.channel.send({ embeds: [pages[0]] });
		}
		else {
			if (isNaN(args[1])) return message.channel.send(`${client.i18n.get(language, "playlist", "detail_notnumber")}`);
			if (args[1] > pagesNum) return message.channel.send(`${client.i18n.get(language, "playlist", "detail_page_notfound", {
                page: pagesNum
            })}`);
			const pageNum = args[1] == 0 ? 1 : args[1] - 1;
			return message.channel.send({ embeds: [pages[pageNum]] });
        }
    } else {
        const Premiumed = new MessageEmbed()
            .setAuthor({ name: `${client.i18n.get(language, "nopremium", "premium_author")}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${client.i18n.get(language, "nopremium", "premium_desc")}`)
            .setColor("#000001")
            .setTimestamp()

        return message.channel.send({ embeds: [Premiumed] });
      }
    } catch (err) {
        console.log(err)
        message.channel.send({ content: `${client.i18n.get(language, "nopremium", "premium_error")}` })
        }
    }
};