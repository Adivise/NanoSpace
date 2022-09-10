const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "247",
        description: "24/7 Music!",
        accessableby: "Member",
        category: "Music"
    },
    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "247_loading")}`);

        try {
            if (user && user.isPremium) {
                
            const player = client.manager.get(message.guild.id);
            if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
            const { channel } = message.member.voice;
            if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

        if (player.twentyFourSeven) {
            player.twentyFourSeven = false;
            const off = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "music", "247_off")}`)
            .setColor(client.color);

            msg.edit({ content: " ", embeds: [off] });
        } else {
            player.twentyFourSeven = true;
            const on = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "music", "247_on")}`)
            .setColor(client.color);

            msg.edit({ content: " ", embeds: [on] });
        }
    } else {
        const Premiumed = new EmbedBuilder()
            .setAuthor({ name: `${client.i18n.get(language, "nopremium", "premium_author")}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`${client.i18n.get(language, "nopremium", "premium_desc")}`)
            .setColor(client.color)
            .setTimestamp()

        return msg.edit({ content: " ", embeds: [Premiumed] });
      }
    } catch (err) {
        console.log(err)
        msg.edit({ content: `${client.i18n.get(language, "nopremium", "premium_error")}` })
        }
    }
};