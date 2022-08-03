const { EmbedBuilder } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');

module.exports = { 
    config: {
        name: "remove",
        usage: "<playlist name> <song position>",
        description: "Remove a song from a playlist",
        accessableby: "Premium",
        category: "Playlist",
    },
    run: async (client, message, args, user, language, prefix) => {

        try {
            if (user && user.isPremium) {

                if(!args[0]) return message.channel.send(`${client.i18n.get(language, "playlist", "remove_arg", {
                    prefix: prefix
                })}`);
                if(!args[1]) return message.channel.send(`${client.i18n.get(language, "playlist", "remove_arg", {
                    prefix: prefix
                })}`);

                const Plist = args[0].replace(/_/g, ' ');

                const playlist = await Playlist.findOne({ name: Plist });
                if(!playlist) return message.channel.send(`${client.i18n.get(language, "playlist", "remove_notfound")}`);
                if(playlist.owner !== message.author.id) return message.channel.send(`${client.i18n.get(language, "playlist", "remove_owner")}`);
            
                const position = args[1];
                const song = playlist.tracks[position];
                if(!song) return message.channel.send(`${client.i18n.get(language, "playlist", "remove_song_notfound")}`);

                playlist.tracks.splice(position - 1, 1);
                await playlist.save();

                const embed = new EmbedBuilder()
                    .setDescription(`${client.i18n.get(language, "playlist", "remove_removed", {
                        name: Plist,
                        position: args[1]
                        })}`)
                    .setColor(client.color)

                message.channel.send({ embeds: [embed] });
                
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