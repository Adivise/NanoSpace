const { EmbedBuilder } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');

module.exports = { 
    config: {
        name: "public",
        usage: "<playlist name>",
        description: "Public a playlist",
        accessableby: "Premium",
        category: "Playlist",
    },
    run: async (client, message, args, user, language, prefix) => {

        try {
            if (user && user.isPremium) {

        if(!args[0]) return message.channel.send(`${client.i18n.get(language, "playlist", "public_arg", {
            prefix: prefix
        })}`);

        const PName = args[0].replace(/_/g, ' ');

        const playlist = await Playlist.findOne({ name: PName });
        if(!playlist) return message.channel.send(`${client.i18n.get(language, "playlist", "public_notfound")}`);
        if(playlist.owner !== message.author.id) return message.channel.send(`${client.i18n.get(language, "playlist", "public_owner")}`);

        const Public = await Playlist.findOne({ name: PName, private: false });
        if(Public) return message.channel.send(`${client.i18n.get(language, "playlist", "public_already")}`);

        const msg = await message.channel.send(`${client.i18n.get(language, "playlist", "public_loading")}`);

        playlist.private = false;

        playlist.save().then(() => {
            const embed = new EmbedBuilder()
                .setDescription(`${client.i18n.get(language, "playlist", "public_success")}`)
                .setColor(client.color)
            msg.edit({ content: " ", embeds: [embed] });
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