const { MessageEmbed } = require('discord.js');
const Redeem = require('../../settings/models/Redeem.js')
const PremiumUser = require('../../settings/models/PremiumUser.js')
const moment = require('moment')

module.exports = { 
    config: {
        name: "redeem",
        aliases: ["redeemcode"],
        usage: "<code>",
        description: "Redeem a premium code!",
        accessableby: "Member",
        category: "premium",
    },
    run: async (client, message, args, user, language, prefix) => {
        
        let member = await PremiumUser.findOne({ Id: message.author.id })
  
        let code = args[0]
        if (!code)
            return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor('#000001')
                .setDescription(`${client.i18n.get(language, "premium", "redeem_arg")}`),
            ],
        })

        if (member && member.isPremium) {
            return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor('#000001')
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
        member.premium.redeemedBy.push(message.author)
        member.premium.redeemedAt = Date.now()
        member.premium.expiresAt = premium.expiresAt
        member.premium.plan = premium.plan

        member = await member.save({ new: true }).catch(() => {})
        client.premiums.set(message.author.id, member)
        await premium.deleteOne().catch(() => {})

        message.channel.send({
            embeds: [
            new MessageEmbed()
                .setTitle(`${client.i18n.get(language, "premium", "redeem_title")}`)
                .setDescription(`${client.i18n.get(language, "premium", "redeem_desc", {
                    expires: expires,
                })}`)
                .setColor('#000001')
                .setTimestamp(),
            ],
        })
  
        } else {
        return message.channel.send({
            embeds: [
            new MessageEmbed()
                .setColor('#000001')
                .setDescription(`${client.i18n.get(language, "premium", "redeem_invalid")}`),
                ],
            })
        }
    }
}