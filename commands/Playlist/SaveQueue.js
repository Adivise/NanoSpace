const { EmbedBuilder } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');

const TrackAdd = [];

module.exports = { 
    config: {
        name: "savequeue",
        usage: "<playlist name>",
        description: "Save the current queue to a playlist",
        accessableby: "Premium",
        category: "Playlist",
    },
    run: async (client, message, args, user, language, prefix) => {

        try {
            if (user && user.isPremium) {

                if(!args[0]) return message.channel.send(`${client.i18n.get(language, "playlist", "savequeue_arg", {
                    prefix: prefix
                })}`);

                const Plist = args[0].replace(/_/g, ' ');

                const playlist = await Playlist.findOne({ name: Plist });
                if(!playlist) return message.channel.send(`${client.i18n.get(language, "playlist", "savequeue_notfound")}`);
                if(playlist.owner !== message.author.id) return message.channel.send(`${client.i18n.get(language, "playlist", "savequeue_owner")}`);

                const player = client.manager.get(message.guild.id);
                if (!player) return message.channel.send(`${client.i18n.get(language, "noplayer", "no_player")}`);
                const { channel } = message.member.voice;
                if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return message.channel.send(`${client.i18n.get(language, "noplayer", "no_voice")}`);

                const queue = player.queue.map(track => track);
                const current = player.queue.current;

                TrackAdd.push(current);
                TrackAdd.push(...queue);

                const embed = new EmbedBuilder()
                    .setDescription(`${client.i18n.get(language, "playlist", "savequeue_saved", {
                        name: Plist,
                        tracks: queue.length + 1
                        })}`)
                    .setColor(client.color)

                message.channel.send({ embeds: [embed] });

                playlist.tracks.push(...TrackAdd);
                playlist.save().then(() => {
                    TrackAdd.length = 0;
                });

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