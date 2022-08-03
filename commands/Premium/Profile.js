const { EmbedBuilder } = require('discord.js');
const Premium = require('../../settings/models/Premium.js')
const moment = require('moment');

module.exports = { 
    config: {
        name: "profile",
        description: "View your premium profile!",
        accessableby: "Member",
        category: "Premium",
    },
    run: async (client, message, args, user, language, prefix) => {

        const PremiumPlan = await Premium.findOne({ Id: message.author.id })
        const expires = moment(PremiumPlan.premium.expiresAt).format('dddd, MMMM Do YYYY HH:mm:ss');

		try {
		if (user && user.isPremium) {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${client.i18n.get(language, "premium", "profile_author")}`, iconURL: client.user.displayAvatarURL() })
                .setDescription(`${client.i18n.get(language, "premium", "profile_desc", {
                    user: message.author.tag,
                    plan: PremiumPlan.premium.plan,
                    expires: expires
                })}`)
                .setColor(client.color)
                .setTimestamp()

            return message.channel.send({ embeds: [embed] });

        } else {
            const Premiumed = new EmbedBuilder()
                .setAuthor({ name: `${client.i18n.get(language, "nopremium", "premium_author")}`, iconURL: client.user.displayAvatarURL() })
                .setDescription(`${client.i18n.get(language, "nopremium", "premium_desc")}`)
                .setColor(client.color)
                .setTimestamp()
    
            return message.channel.send({ content: " ", embeds: [Premiumed] });
          }
        } catch (err) {
            console.log(err)
            message.channel.send({ content: `${client.i18n.get(language, "nopremium", "premium_error")}` })
            }
        }
    };