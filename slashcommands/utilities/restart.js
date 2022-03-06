const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "restart",
    description: "Shuts down the client!",
    ownerOnly: true,

    run: async (interaction, client, user, language) => {
    await interaction.deferReply({ ephemeral: false });

    const restart = new MessageEmbed()
        .setDescription(`${client.i18n.get(language, "utilities", "restart_msg")}`)
        .setColor(client.color);

    await interaction.editReply({ embeds: [restart] });
            
    process.exit();
    }
};