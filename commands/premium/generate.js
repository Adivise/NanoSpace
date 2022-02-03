const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const Redeem = require('../../settings/models/Redeem.js');
const moment = require('moment')
var voucher_codes = require('voucher-code-generator')

module.exports = { 
    config: {
        name: "generate",
        aliases: ["gencode", "genpremiumcode", "genpremium"],
        usage: "generate <plan> <amount>",
        description: "Generate a premium code",
        accessableby: "Owner",
        category: "premium",
    },
    run: async (client, message, args) => {
    if(message.author.id != client.owner) return message.channel.send("You're not the client owner!")
    console.log(chalk.magenta(`[COMMAND] Generate used by ${message.author.tag} from ${message.guild.name}`));
    let codes = [];

    const plan = args[0];
    const plans = ['daily', 'weekly', 'monthly', 'yearly'];

    if (!plan) return message.channel.send({ content: `**> Please provide plan**` })

    if (!plans.includes(args[0]))
      return message.channel.send({ content:  `**Invalid Plan, available plans:** ${plans.join(', ')}`})

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

    const embed = new MessageEmbed()
      .setColor('#000001')
      .setAuthor({ name: `Generate Code`, iconURL: client.user.avatarURL() })
      .setDescription(`• *Generated* [\`+${codes.length}\`]\n\`\`\`${codes.join('\n')}\`\`\`\n • *Plan*: \`${plan}\`\n • *Expires at*: \`${moment(time).format('dddd, MMMM Do YYYY')}\``)
      .setTimestamp()
      .setFooter({ text: `Type: ${client.prefix}redeem <code> to redeem!`, iconURL: message.author.displayAvatarURL() })

      message.channel.send({ embeds: [embed] })
  }
}