const { EmbedBuilder } = require('discord.js');
const Premium = require('../../settings/models/Premium.js');

module.exports = {
    ownerOnly: true,
    config: {
        name: "unpremium",
        description: "Remove premium from members!",
        usage: "@mention",
        category: "Premium",
        accessableby: "Owner",
    },
    run: async (client, message, args, user, language, prefix) => {
        const mentions = message.mentions.members.first();
        if (!mentions) return message.channel.send(`${client.i18n.get(language, "premium", "unpremium_mention")}`)

        const db = await Premium.findOne({ Id: mentions.user.id });

        if (db.isPremium) {
            db.isPremium = false
            db.premium.redeemedBy = []
            db.premium.redeemedAt = null
            db.premium.expiresAt = null
            db.premium.plan = null

            const newUser = await db.save({ new: true }).catch(() => {})
            client.premiums.set(newUser.Id, newUser);

            const embed = new EmbedBuilder()
                .setDescription(`${client.i18n.get(language, "premium", "unpremium_desc", {
                    user: mentions.user
                })}`)
                .setColor(client.color)

            message.channel.send({ embeds: [embed] });

        } else {
            const embed = new EmbedBuilder()
                .setDescription(`${client.i18n.get(language, "premium", "unpremium_already", {
                    user: mentions.user
                })}`)
                .setColor(client.color)

            message.channel.send({ embeds: [embed] });
        }

    }
};