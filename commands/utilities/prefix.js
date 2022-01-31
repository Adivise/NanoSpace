const { MessageEmbed } = require('discord.js');
const GPrefix = require('../../settings/models/Prefix.js');

module.exports = {
    config: {
        name: "prefix",
        aliases: ["setprefix"],
        usage: "",
        category: "utilities",
        description: "Change the prefix for the bot",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply('You need the `MANAGE_GUILD` permission to use this command.');
        if(!args[0]) return message.channel.send(`**Please specify a prefix!**`);
        if(args[0].length > 10) return message.channel.send(`**The prefix can't be longer than 10 characters!**`);

        const newPrefix = new GPrefix({
            guild: message.guild.id,
            prefix: args[0]
        });

        await newPrefix.save().then(() => {
        const embed = new MessageEmbed()
            .setDescription(`**Prefix changed to \`${args.join(" ")}\`**`)
            .setColor('#000001')

        message.channel.send({ embeds: [embed] });

        }).catch(err => console.log(err));
    }
}