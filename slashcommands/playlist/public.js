const { MessageEmbed } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');

module.exports = { 
    name: "public",
    description: "Public a playlist",
    options: [
        {
            name: "name",
            description: "The name of the playlist",
            required: true,
            type: 3
        }
    ],
    run: async (interaction, client, user, language) => {

        const value = interaction.options.getString("name");

        try {
            if (user && user.isPremium) {

        const PName = value.replace(/_/g, ' ');

        const playlist = await Playlist.findOne({ name: PName });
        if(!playlist) return interaction.editReply(`${client.i18n.get(language, "playlist", "public_notfound")}`);
        if(playlist.owner !== interaction.user.id) return interaction.editReply(`${client.i18n.get(language, "playlist", "public_owner")}`);

        const Public = await Playlist.findOne({ name: PName, private: false });
        if(Public) return interaction.editReply(`${client.i18n.get(language, "playlist", "public_already")}`);

        const msg = await interaction.editReply(`${client.i18n.get(language, "playlist", "public_loading")}`);

        playlist.private = false;

        playlist.save().then(() => {
            const embed = new MessageEmbed()
                .setDescription(`${client.i18n.get(language, "playlist", "public_success")}`)
                .setColor(client.color)
            msg.edit({ content: " ", embeds: [embed] });
        });

    } else {
        const Premiumed = new MessageEmbed()
            .setAuthor({ name: `${client.i18n.get(language, "nopremium", "premium_author")}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${client.i18n.get(language, "nopremium", "premium_desc")}`)
            .setColor(client.color)
            .setTimestamp()

        return interaction.editReply({ content: " ", embeds: [Premiumed] });
      }
    } catch (err) {
        console.log(err)
        interaction.editReply({ content: `${client.i18n.get(language, "nopremium", "premium_error")}` })
        }
    }
};