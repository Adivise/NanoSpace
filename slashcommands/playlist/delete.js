const { MessageEmbed } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');

module.exports = { 
    name: "delete",
    description: "Delete a playlist",
    options: [
        {
            name: "name",
            description: "The name of the playlist",
            required: true,
            type: 3
        }
    ],
    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });

        const value = interaction.options.getString("name");

        try {
            if (user && user.isPremium) {

        const Plist = value.replace(/_/g, ' ');

        const playlist = await Playlist.findOne({ name: Plist });
        if(!playlist) return interaction.editReply(`${client.i18n.get(language, "playlist", "delete_notfound")}`);
        if(playlist.owner !== interaction.user.id) return interaction.editReply(`${client.i18n.get(language, "playlist", "delete_owner")}`);

        await playlist.delete();

        const embed = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "playlist", "delete_deleted", {
                name: Plist
                })}`)
            .setColor(client.color)

        interaction.editReply({ embeds: [embed] });
    } else {
        const Premiumed = new MessageEmbed()
            .setAuthor({ name: `${client.i18n.get(language, "nopremium", "premiun_author")}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${client.i18n.get(language, "nopremium", "premiun_desc")}`)
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