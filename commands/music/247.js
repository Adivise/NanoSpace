const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "247",
        description: "Make bot 24/7 in voice channel!",
        accessableby: "Member",
        category: "music"
    },
    run: async (client, message, args, user, language) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "247_loading")}`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);

        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

        try {
            if (user && user.isPremium) {
        if (player.twentyFourSeven) {
            player.twentyFourSeven = false;
            const off = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "music", "247_off")}`)
            .setColor('#000001');

            msg.edit({ content: " ", embeds: [off] });
        } else {
            player.twentyFourSeven = true;
            const on = new MessageEmbed()
            .setDescription(`${client.i18n.get(language, "music", "247_on")}`)
            .setColor('#000001');

            msg.edit({ content: " ", embeds: [on] });
        }
    } else {
        const Premiumed = new MessageEmbed()
            .setAuthor({ name: `${client.i18n.get(language, "nopremium", "premiun_author")}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${client.i18n.get(language, "nopremium", "premiun_desc")}`)
            .setColor("#000001")
            .setTimestamp()

        return message.channel.send({ embeds: [Premiumed] });
      }
    } catch (err) {
        console.log(err)
        message.channel.send({ content: `${client.i18n.get(language, "nopremium", "premium_error")}` })
        }
    }
};