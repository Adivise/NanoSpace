const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "restart",
    description: "Restarts the bot.",
    ownerOnly: true,

    run: async (interaction, client) => {
    await interaction.deferReply({ ephemeral: false });
    const restart = new MessageEmbed()
        .setDescription("**Account has been**: `Shutting down...`")
        .setColor("#000001");

    await interaction.editReply({ embeds: [restart] });
            
    process.exit();
    }
};