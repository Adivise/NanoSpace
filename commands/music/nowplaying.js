const chalk = require('chalk');
const delay = require('delay');
const { embedDurationLength } = require('../../config/settings.js');
const formatDuration = require("../../structures/formatduration.js");
const { MessageEmbed } = require("discord.js");
const { api_key } = require("../../config.json")
const fetch = require('node-fetch')

module.exports = { 
    config: {
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "Displays what the bot is currently playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send('Loading please wait...');

        const player = client.music.players.get(message.guild.id);
        if (!player || !player.queue[0]) return message.channel.send("No song/s currently playing within this guild.");
        
        const { title, duration, uri, identifier, requester, author } = player.queue[0];

        const CurrentDuration = formatDuration(player.position);
		const Duration = formatDuration(duration);
        const thumbnail = `https://img.youtube.com/vi/${identifier}/hqdefault.jpg`;
        const part = Math.floor((player.position / duration) * embedDurationLength);
        const uni = player.playing ? '🔴 |' : '⏸️ |';
        const { items } = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${identifier}&key=${api_key}&part=statistics&fields=items(statistics)`).then(response => response.json());
        const [answer] = items;
        const views = answer.statistics.viewCount;
        const likes = answer.statistics.likeCount;
        const dislikes = answer.statistics.dislikeCount;

        const embed = new MessageEmbed()
            .setAuthor(player.playing ? 'Now Playing...' : 'Song Pause..', "https://cdn.discordapp.com/emojis/741605543046807626.gif")
            .setColor('#000001')
            .setDescription(`**[${title}](${uri})**`)
            .setThumbnail(thumbnail)
            .addField('Views', views.toLocaleString(), true)
            .addField('Author:', author, true)
            .addField('Likes:', likes.toLocaleString(), true)
            .addField('Dislikes:', dislikes.toLocaleString(), true)
            .addField('Requester:', requester, true)
            .addField('Volume:', player.volume + "%", true)
			.addField(`Current Duration: \`[${CurrentDuration} / ${Duration}]\``, `\`\`\`${uni} ${'─'.repeat(part) + '🎶' + '─'.repeat(embedDurationLength - part)}\`\`\``)
            .setTimestamp();
            
                msg.edit('', embed)
                    console.log(chalk.magenta(`  [Command]: Nowplaying used by ${message.author.tag} from ${message.guild.name}`));
    }
}