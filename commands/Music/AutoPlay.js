const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "autoplay",
        description: "Auto play music in voice channel.",
        accessableby: "Member",
        category: "Music"
    },
    run: async (client, message, args, user, language, prefix) => {
        const msg = await message.channel.send(`${client.i18n.get(language, "music", "autoplay_loading")}`);
  
        try {
            if (user && user.isPremium) {

                const player = client.manager.get(message.guild.id);
                if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        
                const autoplay = player.get("autoplay");
        
                const { channel } = message.member.voice;
                if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);
        
        if (autoplay === true) {

            await player.set("autoplay", false);
            await player.queue.clear();

            const off = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "music", "autoplay_off")}`)
            .setColor(client.color);

            msg.edit({ content: " ", embeds: [off] });
        } else {

            const identifier = player.queue.current.identifier;
            const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
            const res = await player.search(search, message.author);

            await player.set("autoplay", true);
            await player.set("requester", message.author);
            await player.set("identifier", identifier);
            await player.queue.add(res.tracks[1]);

            const on = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "music", "autoplay_on")}`)
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