const { MessageEmbed } = require('discord.js');
const PremiumUser = require('../../settings/models/PremiumUser.js')
const moment = require('moment');

module.exports = { 
    name: "profile",
    description: "View your premium profile!",
    
    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });

        const PremiumPlan = await PremiumUser.findOne({ Id: interaction.user.id })
        const expires = moment(PremiumPlan.premium.expiresAt).format('dddd, MMMM Do YYYY HH:mm:ss');

		try {
		if (user && user.isPremium) {
            const embed = new MessageEmbed()
                .setAuthor({ name: `${client.i18n.get(language, "premium", "profile_author")}`, iconURL: client.user.displayAvatarURL() })
                .setDescription(`${client.i18n.get(language, "premium", "profile_desc", {
                    user: interaction.user.tag,
                    plan: PremiumPlan.premium.plan,
                    expires: expires
                })}`)
                .setColor(client.color)
                .setTimestamp()

            return interaction.editReply({ embeds: [embed] });

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