const { Utils } = require("erela.js")
const chalk = require('chalk');

module.exports = { 
    config: {
        name: "play",
        description: "Play a song/playlist or search for a song from youtube",
        usage: "<results>",
        category: "music",
        accessableby: "Member",
        aliases: ["p", "pplay"]
    },
    run: async (bot, message, args) => {
        const msg = await message.channel.send('Loading please wait...')
        const { voiceChannel } = message.member;
        if (!voiceChannel) return msg.edit("You need to be in a voice channel to play music.");

        const permissions = voiceChannel.permissionsFor(bot.user);
        if (!permissions.has("CONNECT")) return msg.edit("I cannot connect to your voice channel, make sure I have permission to!");
        if (!permissions.has("SPEAK")) return msg.edit("I cannot connect to your voice channel, make sure I have permission to!");

        if (!args[0]) return msg.edit("Please provide a song name or link to search.");

        const player = bot.music.players.spawn({
            guild: message.guild,
			selfDeaf: true,
            textChannel: message.channel,
            voiceChannel
        });

        bot.music.search(args.join(" "), message.author).then(async res => {
            switch (res.loadType) {
                case "TRACK_LOADED":
                    player.queue.add(res.tracks[0]);
                    msg.edit(`Starting playing... \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration, true)}\``);
                    if (!player.playing) player.play()
                    break;
                
                case "SEARCH_RESULT":
                    let index = 1;
                    const tracks = res.tracks.slice(0, 5);

                    const results = res.tracks
                        .slice(0, 5)
                        .map(video => `**${index++} -** ${video.title}`)
                        .join("\n");

                    await msg.edit(`**__Song Selection__**\n \n${results}\n \n**Please type** \`number 1 - 5\` **select the song in 30s type** \`cancel\` **to Cancel**`)

                    const collector = message.channel.createMessageCollector(m => {
                        return m.author.id === message.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
                    }, { time: 30000, max: 1});

                    collector.on("collect", m => {
                        if (/cancel/i.test(m.content)) return collector.stop("cancelled")

                        const track = tracks[Number(m.content) - 1];
                        player.queue.add(track)
                        msg.edit(`Starting playing... \`${track.title}\` \`${Utils.formatTime(track.duration, true)}\``);
                            console.log(chalk.magenta(`  [Command]: Play used by ${message.author.tag} from ${message.guild.name}`));
                        if(!player.playing) player.play();
                    });

                    collector.on("end", (_, reason) => {
                        if(["time", "cancelled"].includes(reason)) return msg.edit("Cancelled selection.")
                    });
                    break;

                case "PLAYLIST_LOADED":
                    res.playlist.tracks.forEach(track => player.queue.add(track));
                    const duration = Utils.formatTime(res.playlist.tracks.reduce((acc, cur) => ({duration: acc.duration + cur.duration})).duration, true);
                    msg.edit(`Starting playing... \`${res.playlist.tracks.length}\` \`${duration}\` tracks in playlist \`${res.playlist.info.name}\``);
                        console.log(chalk.magenta(`  [Command]: Play used by ${message.author.tag} from ${message.guild.name}`));
                        if(!player.playing) player.play()
                    break;
            }
        }).catch(err => msg.edit(err.message))
    }
}