const { convertTime } = require("../../structures/convert.js")
const chalk = require('chalk');
const { MessageEmbed } = require("discord.js");

module.exports = { 
    name: "play",
    description: "Play a song from any types.",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],
    options: [
        {
            name: "input",
            description: "The input of the song",
            type: 3,
            required: true,
        }
    ],

    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const value = interaction.options.get("input").value;
        const msg = await interaction.editReply(`**Searching \`${value}\` please wait...**`)

        const { channel } = interaction.member.voice;
        if (!channel) return msg.edit("You need to be in a voice channel to use command.");

        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            selfDeafen: true,
        });
        
        const state = player.state;
        if (state != "CONNECTED") await player.connect();
        client.manager.search(value, interaction.user).then(async res => {
            switch (res.loadType) {
                case "TRACK_LOADED":
                    player.queue.add(res.tracks[0]);

                const embed = new MessageEmbed()
                    .setDescription(`**Queued • [${res.tracks[0].title}](${res.tracks[0].uri})** \`${convertTime(res.tracks[0].duration, true)}\` • ${res.tracks[0].requester}`)
                    .setColor('#000001')

                    msg.edit({ content: " ", embeds: [embed] });
                        console.log(chalk.magenta(`[SLASHCOMMAND] Play used by ${interaction.user.tag} from ${interaction.guild.name}`));
                    if (!player.playing) player.play()
                    break;

                case "SEARCH_RESULT":
                const res1 = await client.manager.search(
                    value.slice(6),
                    interaction.user
                );
                    player.queue.add(res1.tracks[0]);

                    const embed1 = new MessageEmbed()
                        .setDescription(`**Queued • [${res1.tracks[0].title}](${res1.tracks[0].uri})** \`${convertTime(res1.tracks[0].duration, true)}\` • ${res1.tracks[0].requester}`)
                        .setColor('#000001')
            
                      msg.edit({ content: " ", embeds: [embed1] });
                        console.log(chalk.magenta(`[SLASHCOMMAND] Play used by ${interaction.user.tag} from ${interaction.guild.name}`));
                      if (!player.playing) player.play()
                    break;

                case "PLAYLIST_LOADED":
                    let search = await player.search(value, interaction.user);
                    player.queue.add(search.tracks)

                    const playlist = new MessageEmbed()
                        .setDescription(`**Queued** • [${search.playlist.name}](${value}) \`${convertTime(search.playlist.duration)}\` (${search.tracks.length} tracks) • ${search.tracks[0].requester}`)
                        .setColor('#000001')

                    msg.edit({ content: " ", embeds: [playlist] });
                        console.log(chalk.magenta(`[SLASHCOMMAND] Play used by ${interaction.user.tag} from ${interaction.guild.name}`));
                        if(!player.playing) player.play()
                    break;
            }
        }).catch(err => msg.edit(err.message))
    }
}