const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const Redeem = require('../../settings/models/Redeem.js');
const PremiumUser = require('../../settings/models/PremiumUser.js');
const moment = require('moment')

module.exports = { 
    config: {
        name: "premium",
        aliases: [],
        usage: "premium <plan> <user id>",
        description: "Give premium to a user!",
        accessableby: "Owner",
        category: "premium",
    },
    run: async (client, message, args) => {
    if(message.author.id != client.owner) return message.channel.send("You're not the client owner!")
    console.log(chalk.magenta(`[COMMAND] Premium used by ${message.author.tag} from ${message.guild.name}`));

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

    if(!args[1]) return message.channel.send(`**Please specify a member id** Example: \`${client.prefix}premium <plan> <user id>\``);
    const member = args[1];
    if(member != client.users.cache.get(member)) return message.channel.send(`**Please give me the user's id!**`);

    let PushMember = [];
    let user = await PremiumUser.findOne({ Id: member })

    PushMember.push(client.users.cache.get(member))

    if (user) {
        user.isPremium = true
        user.premium.redeemedBy.push(client.users.cache.get(member))
        user.premium.redeemedAt = Date.now()
        user.premium.expiresAt = time
        user.premium.plan = plan
    
        user = await user.save({ new: true }).then(() => {
            client.premiums.set(client.users.cache.get(member).id, user)
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor('#000001')
                    .setTitle('Premium Changed')
                    .setDescription(`*Plan*: \`${plan}\`\n *Member*: \`${client.users.cache.get(member).tag}\``),
                ],
            })
        }).catch(() => {})
       
        PushMember = 0;
    } else {
        user = new PremiumUser({
            Id: member,
            isPremium: true,
            premium: {
                redeemedBy: PushMember,
                redeemedAt: Date.now(),
                expiresAt: time,
                plan: plan,
            },
        });
        user = await user.save({ new: true }).then(() => {
            client.premiums.set(client.users.cache.get(member).id, user)
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor('#000001')
                    .setTitle('Premium Given')
                    .setDescription(`*Plan*: \`${plan}\`\n *Member*: \`${client.users.cache.get(member).tag}\``),
                ],
            })
        }).catch(() => {})

        PushMember = 0;
    }

    const embed = new MessageEmbed()
      .setColor('#000001')
      .setAuthor({ name: `Premium`, iconURL: client.user.avatarURL() })
      .setDescription(`• *User*: \`${client.users.cache.get(member).tag}\` • *Plan*: \`${plan}\`\n • *Expires at*: \`${moment(time).format('dddd, MMMM Do YYYY')}\``)
      .setTimestamp()
      .setFooter({ text: `Give by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })

      message.channel.send({ embeds: [embed] })
  }
}