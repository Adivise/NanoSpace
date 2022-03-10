const { MessageEmbed } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');

module.exports = { 
    name: "create",
    description: "Create a playlist",
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

        if(value.length > 16) return interaction.editReply(`${client.i18n.get(language, "playlist", "create_toolong")}`);

        const PlaylistName = value.replace(/_/g, ' ');

        const msg = await interaction.editReply(`${client.i18n.get(language, "playlist", "create_loading")}`);

        const Limit = await Playlist.find({ owner: interaction.user.id }).countDocuments();
        const Exist = await Playlist.findOne({ name: PlaylistName });

        if(Exist) { msg.edit(`${client.i18n.get(language, "playlist", "create_name_exist")}`); return; }
        if(Limit >= client.config.LIMIT_PLAYLIST) { msg.edit(`${client.i18n.get(language, "playlist", "create_limit_playlist", {
            limit: client.config.LIMIT_PLAYLIST
        })}`); return; }

        const CreateNew = new Playlist({
            name: PlaylistName,
            owner: interaction.user.id,
            tracks: [],
            private: true,
            created: Date.now()
        });

        CreateNew.save().then(() => {
            const embed = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "playlist", "create_created", {
                playlist: PlaylistName
                })}`)
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