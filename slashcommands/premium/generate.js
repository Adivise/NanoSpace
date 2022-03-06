const { MessageEmbed } = require('discord.js');
const Redeem = require('../../settings/models/Redeem.js');
const moment = require('moment')
var voucher_codes = require('voucher-code-generator')

module.exports = { 
  name: "generate",
  description: "Generate a voucher code",
  options: [
      {
          name: "plan",
          description: "The plan you want to generate a voucher code for",
          required: true,
          type: 3
      },
      {
          name: "amount",
          description: "The amount of codes you want to generate",
          required: false,
          type: 3
      }
  ],
  ownerOnly: true,
    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });

        const name = interaction.options.getString("plan");
        const camount = interaction.options.getString("amount");

    let codes = [];

    const plan = name;
    const plans = ['daily', 'weekly', 'monthly', 'yearly'];

    if (!plans.includes(name))
      return interaction.editReply({ content:  `${client.i18n.get(language, "premium", "plan_invalid", {
        plans: plans.join(', ')
      })}` })

    let time;
    if (plan === 'daily') time = Date.now() + 86400000;
    if (plan === 'weekly') time = Date.now() + 86400000 * 7;
    if (plan === 'monthly') time = Date.now() + 86400000 * 30;
    if (plan === 'yearly') time = Date.now() + 86400000 * 365;

    let amount = camount;
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

    const embed = new MessageEmbed()
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
        prefix: "/"
      })}`, iconURL: interaction.user.displayAvatarURL() })

      interaction.editReply({ embeds: [embed] })
  }
}