const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const Premium = require('../../settings/models/Premium.js');

module.exports = { 
    config: {
        name: "premium",
        aliases: [],
        description: "Add members to the premium list",
        accessableby: "Owner",
        category: "utilities",
    },
    run: async (client, message, args) => {
        if(message.author.id != client.owner) return message.channel.send("You're the client the owner!")
        console.log(chalk.magenta(`[COMMAND] Premium used by ${message.author.tag} from ${message.guild.name}`));

        const user = message.mentions.users.first();
        if(!user) return message.channel.send(`**Please mention the user!**`);

        const premium = await Premium.findOne({ member: user.id });

        if(!premium) {
            const newPremium = new Premium({
                member: user.id,
                premium: true,
            });

            await newPremium.save();

            const embed = new MessageEmbed()
                .setDescription(`**${user} is now premium!**`)
                .setColor('#000001')

            message.channel.send({ embeds: [embed] });
        } else if(premium) {
;
            await premium.delete();

            const embed = new MessageEmbed()
                .setDescription(`**${user} is no longer premium!**`)
                .setColor('#000001')

            message.channel.send({ embeds: [embed] });
        }
    }
}