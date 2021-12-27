const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "restart",
    description: "Restarts the bot.",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],
    ownerOnly: true,

    run: async (interaction, client) => {
    await interaction.deferReply({ ephemeral: false });
    const restart = new MessageEmbed()
        .setDescription("**Account has been**: `Shutting down...`")
        .setColor("#000001");

    await interaction.editReply({ embeds: [restart] });
        console.log(chalk.red(`[CLIENT] Restarting...`));
            
    process.exit();
    }
};