const delay = require('delay');
const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "bassboost",
        description: "Turning on bassboost filter",
        category: "Filters",
        usage: "<-10 - 10>",
        accessableby: "Member",
        aliases: ["bb"]
    },

    run: async (client, message, args, user, language, prefix) => {
        try {
            if (user && user.isPremium) {

            const player = client.manager.get(message.guild.id);
            if(!player) return message.channel.send(`${client.i18n.get(language, "noplayer", "no_player")}`);
            const { channel } = message.member.voice;
            if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return message.channel.send(`${client.i18n.get(language, "noplayer", "no_voice")}`);
    
		if(!args[0]) {
            const data = {
                op: 'filters',
                guildId: message.guild.id,
                equalizer: [
                    { band: 0, gain: 0.10 },
                    { band: 1, gain: 0.10 },
                    { band: 2, gain: 0.05 },
                    { band: 3, gain: 0.05 },
                    { band: 4, gain: -0.05 },
                    { band: 5, gain: -0.05 },
                    { band: 6, gain: 0 },
                    { band: 7, gain: -0.05 },
                    { band: 8, gain: -0.05 },
                    { band: 9, gain: 0 },
                    { band: 10, gain: 0.05 },
                    { band: 11, gain: 0.05 },
                    { band: 12, gain: 0.10 },
                    { band: 13, gain: 0.10 },
                ]
            }

            await player.node.send(data);

			const msg1 = await message.channel.send(`${client.i18n.get(language, "filters", "filter_loading", {
                name: client.commands.get('bassboost').config.name
            })}`);
			const embed = new EmbedBuilder()
				.setDescription(`${client.i18n.get(language, "filters", "filter_on", {
                name: client.commands.get('bassboost').config.name
            })}`)
                .setColor(client.color);
                
			await delay(5000);
            return msg1.edit({ content: " ", embeds: [embed] });
        } 

		if(isNaN(args[0])) return message.channel.send(`${client.i18n.get(language, "filters", "filter_number")}`);
        if(args[0] > 10 || args[0] < -10) return message.channel.send(`${client.i18n.get(language, "filters", "bassboost_limit")}`);
            const data = {
                op: 'filters',
                guildId: message.guild.id,
                equalizer: [
                    { band: 0, gain: args[0] / 10 },
                    { band: 1, gain: args[0] / 10 },
                    { band: 2, gain: args[0] / 10 },
                    { band: 3, gain: args[0] / 10 },
                    { band: 4, gain: args[0] / 10 },
                    { band: 5, gain: args[0] / 10 },
                    { band: 6, gain: args[0] / 10 },
                    { band: 7, gain: 0 },
                    { band: 8, gain: 0 },
                    { band: 9, gain: 0 },
                    { band: 10, gain: 0 },
                    { band: 11, gain: 0 },
                    { band: 12, gain: 0 },
                    { band: 13, gain: 0 },
                ]
            }
            await player.node.send(data);
		    const msg2 = await message.channel.send(`${client.i18n.get(language, "filters", "bassboost_loading", {
                amount: args[0]
                })}`);
		    const embed = new EmbedBuilder()
			    .setDescription(`${client.i18n.get(language, "filters", "bassboost_set", {
                amount: args[0]
                })}`)
                .setColor(client.color);
            
		    await delay(5000);
            return msg2.edit({ content: " ", embeds: [embed] });
        } else {
            const Premiumed = new EmbedBuilder()
                .setAuthor({ name: `${client.i18n.get(language, "nopremium", "premium_author")}`, iconURL: client.user.displayAvatarURL() })
                .setDescription(`${client.i18n.get(language, "nopremium", "premium_desc")}`)
                .setColor(client.color)
                .setTimestamp()
    
            return message.channel.send({ content: " ", embeds: [Premiumed] });
          }
        } catch (err) {
            console.log(err)
            message.channel.send({ content: `${client.i18n.get(language, "nopremium", "premium_error")}` })
            }
        }
    };