const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const PremiumUser = require('../../settings/models/PremiumUser.js')
const moment = require('moment');

module.exports = { 
    config: {
        name: "profile",
        aliases: [],
		usage: "",
        description: "View your premium profile!",
        accessableby: "Member",
        category: "premium",
    },
    run: async (client, message, args, user) => {
		console.log(chalk.magenta(`[COMMAND] Profile used by ${message.author.tag} from ${message.guild.name}`));

        const PremiumPlan = await PremiumUser.findOne({ Id: message.author.id })
        const expires = moment(PremiumPlan.premium.expiresAt).format('dddd, MMMM Do YYYY HH:mm:ss');

		try {
		if (user && user.isPremium) {
            const embed = new MessageEmbed()
                .setAuthor({ name: "Premium Profile", iconURL: client.user.displayAvatarURL() })
                .setDescription(`*Plan*: \`${PremiumPlan.premium.plan}\`\n*Expires at*: \`${expires}\``)
                .setColor("#000001")
                .setTimestamp()

            return message.channel.send({ embeds: [embed] });

		} else {
			const Premiumed = new MessageEmbed()
				.setAuthor({ name: "Only Premium!", iconURL: client.user.displayAvatarURL() })
				.setDescription(`*You need to be a premium to use this command.*`)
				.setColor("#000001")
				.setTimestamp()

			return message.channel.send({ embeds: [Premiumed] });
	  	}
	    } catch (err) {
		  	console.log(err)
		 	message.channel.send({ content: "Something went wrong, try again later." })
	    }
	}
};