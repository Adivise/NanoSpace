const { MessageEmbed } = require('discord.js');
const Redeem = require('../../settings/models/Redeem.js')
const PremiumUser = require('../../settings/models/PremiumUser.js')
const moment = require('moment')

module.exports = { 
    name: "redeem",
    description: "Redeem your premium!",
    options: [
        {
            name: "code",
            description: "The code you want to redeem",
            required: true,
            type: 3
        }
    ],
    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });

        const input = interaction.options.getString("code");
        
        let member = await PremiumUser.findOne({ Id: interaction.user.id })
  
        let code = input;
        if (!code)
            return interaction.editReply({
            embeds: [
                new MessageEmbed()
                .setColor(client.color)
                .setDescription(`${client.i18n.get(language, "premium", "redeem_arg")}`),
            ],
        })

        if (member && member.isPremium) {
            return interaction.editReply({
            embeds: [
                new MessageEmbed()
                .setColor(client.color)
                .setDescription(`${client.i18n.get(language, "premium", "redeem_already")}`),
            ],
        })
    }
  
        const premium = await Redeem.findOne({
            code: code.toUpperCase(),
        })
  
        if (premium) {
            const expires = moment(premium.expiresAt).format(
            'dddd, MMMM Do YYYY HH:mm:ss',
        )
  
        member.isPremium = true
        member.premium.redeemedBy.push(interaction.user)
        member.premium.redeemedAt = Date.now()
        member.premium.expiresAt = premium.expiresAt
        member.premium.plan = premium.plan

        member = await member.save({ new: true }).catch(() => {})
        client.premiums.set(interaction.user.id, member)
        await premium.deleteOne().catch(() => {})

        interaction.editReply({
            embeds: [
            new MessageEmbed()
                .setTitle(`${client.i18n.get(language, "premium", "redeem_title")}`)
                .setDescription(`${client.i18n.get(language, "premium", "redeem_desc", {
                    expires: expires,
                })}`)
                .setColor(client.color)
                .setTimestamp(),
            ],
        })
  
        } else {
        return interaction.editReply({
            embeds: [
            new MessageEmbed()
                .setColor(client.color)
                .setDescription(`${client.i18n.get(language, "premium", "redeem_invalid")}`),
                ],
            })
        }
    }
}