const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    config: {
        name: "invite",
        aliases: [],
        category: "Utilities",
        description: "Invite the bot to your server.",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Loading please wait....`);

        const embed = new EmbedBuilder()
            .setColor("#000001")
            .setAuthor({ name: "Invite!"})
            .setDescription("```Invite me to your server!```")
            .setTimestamp()
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL()});

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Invite")
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot`)
                    .setEmoji("🔗")
                    .setStyle(ButtonStyle.Link)
            )
        
        await msg.edit({ embeds: [embed], components: [row] });
    }
}
