const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const Redeem = require('../../settings/models/Redeem.js')
const PremiumUser = require('../../settings/models/PremiumUser.js')
const moment = require('moment')

module.exports = { 
    config: {
        name: "redeem",
        aliases: ["redeemcode"],
        usage: "redeem <code>",
        description: "Redeem a premium code!",
        accessableby: "Member",
        category: "premium",
    },
    run: async (client, message, args) => {
    console.log(chalk.magenta(`[COMMAND] Redeem used by ${message.author.tag} from ${message.guild.name}`));

        let user = await PremiumUser.findOne({ Id: message.author.id })
  
        let code = args[0]
        if (!code)
            return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor('#000001')
                .setDescription(`**Please specify the code you want to redeem!**`),
            ],
        })

        if (user && user.isPremium) {
            return message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor('#000001')
                .setDescription(`**> You already are a premium user**`),
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
  
        user.isPremium = true
        user.premium.redeemedBy.push(message.author)
        user.premium.redeemedAt = Date.now()
        user.premium.expiresAt = premium.expiresAt
        user.premium.plan = premium.plan

        user = await user.save({ new: true }).catch(() => {})
        client.premiums.set(message.author.id, user)
        await premium.deleteOne().catch(() => {})

        message.channel.send({
            embeds: [
            new MessageEmbed()
                .setTitle('Premium Redeemed')
                .setDescription(`**You have successfully redeemed premium!**\n\n*Expires at*: [\`${expires}\`]`)
                .setColor('#000001')
                .setTimestamp(),
            ],
        })
  
        } else {
        return message.channel.send({
            embeds: [
            new MessageEmbed()
                .setColor('#000001')
                .setDescription(`**The code is invalid. Please try again using valid one!**`,)
                ],
            })
        }
    }
}