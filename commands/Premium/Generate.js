const { EmbedBuilder } = require('discord.js');
const Redeem = require('../../settings/models/Redeem.js');
const moment = require('moment')
var voucher_codes = require('voucher-code-generator')

module.exports = { 
    ownerOnly: true,
    config: {
        name: "generate",
        aliases: ["gencode", "genpremiumcode", "genpremium"],
        usage: "<plan> <amount>",
        description: "Generate a premium code",
        accessableby: "Owner",
        category: "Premium",
    },
    run: async (client, message, args, user, language, prefix) => {
    let codes = [];

    const plan = args[0];
    const plans = ['daily', 'weekly', 'monthly', 'yearly'];

    if (!plan) return message.channel.send({ content: `${client.i18n.get(language, "premium", "provide_plan", {
        plans: plans.join(', ')
    })}` })

    if (!plans.includes(args[0]))
      return message.channel.send({ content:  `${client.i18n.get(language, "premium", "plan_invalid", {
        plans: plans.join(', ')
      })}` })

    let time;
    if (plan === 'daily') time = Date.now() + 86400000;
    if (plan === 'weekly') time = Date.now() + 86400000 * 7;
    if (plan === 'monthly') time = Date.now() + 86400000 * 30;
    if (plan === 'yearly') time = Date.now() + 86400000 * 365;

    let amount = args[1];
    if (!amount) amount = 1;

    for (var i = 0; i < amount; i++) {
      const codePremium = voucher_codes.generate({
        pattern: '####-####-####'
      })

      const code = codePremium.toString().toUpperCase()
      const find = await Redeem.findOne({ code: code })

      if (!find) {
        Redeem.create({
          code: code,
          plan: plan,
          expiresAt: time
        })
        codes.push(`${i + 1} - ${code}`)
      }
    }

    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setAuthor({ name: `${client.i18n.get(language, "premium", "gen_author")}`, iconURL: client.user.avatarURL() }) //${lang.description.replace("{codes_length}", codes.length).replace("{codes}", codes.join('\n')).replace("{plan}", plan).replace("{expires}", moment(time).format('dddd, MMMM Do YYYY'))}
      .setDescription(`${client.i18n.get(language, "premium", "gen_desc", {
        codes_length: codes.length,
        codes: codes.join('\n'),
        plan: plan,
        expires: moment(time).format('dddd, MMMM Do YYYY')
      })}`)
      .setTimestamp()
      .setFooter({ text: `${client.i18n.get(language, "premium", "gen_footer", {
        prefix: prefix
      })}`, iconURL: message.author.displayAvatarURL() })

      message.channel.send({ embeds: [embed] })
  }
}