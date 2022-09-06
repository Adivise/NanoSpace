const { EmbedBuilder } = require('discord.js');

module.exports = {
    ownerOnly: true,
    config: {
        name: "restart",
        description: "Shuts down the client!",
        usage: "shutdown",
        category: "Utilities",
        accessableby: "Owner",
        aliases: ["stopbot"]
    },
    run: async (client, message, args, user) => {
        const restart = new EmbedBuilder()
            .setDescription(`\`🔄\` | *Restarting...*`)
            .setColor(client.color);

        await message.channel.send({ embeds: [restart] });
                
        await process.exit();
    }
};