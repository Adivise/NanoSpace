const { convertTime } = require("../../structures/convert.js")
const chalk = require('chalk');
const { MessageEmbed, Permissions } = require("discord.js");

module.exports = { 
    config: {
        name: "play",
        description: "Play a song/playlist or search for a song from youtube",
        usage: "<results>",
        category: "music",
        accessableby: "Member",
        aliases: ["p", "pplay"]
    },
    run: async (client, message, args) => {
        console.log(chalk.magenta(`[COMMAND] Play used by ${message.author.tag} from ${message.guild.name}`));
        const msg = await message.channel.send('Loading please wait...')
        
        const { channel } = message.member.voice;
		if (!channel) return message.channel.send("You need to be in a voice channel to use command.");
		if (!channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.CONNECT)) return message.channel.send("I don't have permission to join your voice channel.");
		if (!channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.SPEAK)) return message.channel.send("I don't have permission to speak in your voice channel.");

        if (!args[0]) return msg.edit("Please provide a song name or link to search.");
       // if (args[0].includes("deezer.com") && args[0].includes("artist")) return msg.edit("Artist not supported yet.");

        const player = await client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: true,
        });

        const search = args.join(" ");
        
        const state = player.state;
        if (state != "CONNECTED") await player.connect();
        const res = await client.manager.search(search, message.author);
        if(res.loadType != "NO_MATCHES") {
            if(res.loadType == "TRACK_LOADED") {
                player.queue.add(res.tracks[0]);
                const embed = new MessageEmbed()
                    .setDescription(`**Queued • [${res.tracks[0].title}](${res.tracks[0].uri})** \`${convertTime(res.tracks[0].duration, true)}\` • ${res.tracks[0].requester}`)
                    .setColor('#000001')
                msg.edit({ content: " ", embeds: [embed] });
                if(!player.playing) player.play();
            }
            else if(res.loadType == "PLAYLIST_LOADED") {
                player.queue.add(res.tracks)
                const embed = new MessageEmbed()
                    .setDescription(`**Queued** • [${res.playlist.name}](${search}) \`${convertTime(res.playlist.duration)}\` (${res.tracks.length} tracks) • ${res.tracks[0].requester}`)
                    .setColor('#000001')
                msg.edit({ content: " ", embeds: [embed] });
                if(!player.playing) player.play();
            }
            else if(res.loadType == "SEARCH_RESULT") {
                player.queue.add(res.tracks[0]);
                const embed = new MessageEmbed()
                    .setDescription(`**Queued • [${res.tracks[0].title}](${res.tracks[0].uri})** \`${convertTime(res.tracks[0].duration, true)}\` • ${res.tracks[0].requester}`)
                    .setColor('#000001')
                msg.edit({ content: " ", embeds: [embed] });
                if(!player.playing) player.play();
            }
            else if(res.loadType == "LOAD_FAILED") {
                return msg.edit("Error loading track.");
            }
        }
        else {
            return msg.edit("Error loading track.");
        }
    }
}