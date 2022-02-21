const { MessageEmbed } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');

module.exports = { 
    config: {
        name: "delete",
        usage: "<playlist name>",
        description: "Delete a playlist",
        accessableby: "Member",
        category: "playlist",
    },
    run: async (client, message, args, user, language, prefix) => {

        try {
            if (user && user.isPremium) {
            if(!args[0]) return message.channel.send(`${client.i18n.get(language, "playlist", "delete_arg", {
                prefix: prefix
            })}`);

        const Plist = args[0].replace(/_/g, ' ');

        const playlist = await Playlist.findOne({ name: Plist });
        if(!playlist) return message.channel.send(`${client.i18n.get(language, "playlist", "delete_notfound")}`);
        if(playlist.owner !== message.author.id) return message.channel.send(`${client.i18n.get(language, "playlist", "delete_owner")}`);

        await playlist.delete();

        const embed = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "playlist", "delete_deleted", {
                name: Plist
                })}`)
            .setColor('#000001')

        message.channel.send({ embeds: [embed] });
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