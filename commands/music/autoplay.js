const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "autoplay",
        aliases: [],
        description: "Auto play music in voice channel!",
        accessableby: "Member",
        category: "music"
    },
    run: async (client, message, args, user) => {
        console.log(chalk.magenta(`[COMMAND] Autoplay used by ${message.author.tag} from ${message.guild.name}`));
        const msg = await message.channel.send(`**Loading please wait...**`);
  
        const player = client.manager.get(message.guild.id);
        if (!player) return msg.edit("No song/s currently playing with in this guild.");

        const autoplay = player.get("autoplay");

        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.");

        try {
            if (user && user.isPremium) {
        if (autoplay === true) {

            await player.set("autoplay", false);
            await player.queue.clear();

            const off = new MessageEmbed()
            .setDescription("\`📻\` | **Autoplay has been:** `Deactivated`")
            .setColor('#000001');

            msg.edit({ content: " ", embeds: [off] });
        } else {

            const identifier = player.queue.current.identifier;
            const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
            const res = await player.search(search, message.author);

            await player.set("autoplay", true);
            await player.set("requester", message.author);
            await player.set("identifier", identifier);
            await player.queue.add(res.tracks[1]);

            const on = new MessageEmbed()
            .setDescription("\`📻\` | **Autoplay has been:** `Activated`")
            .setColor('#000001');

            msg.edit({ content: " ", embeds: [on] });
        }
    } else {
        const Premiumed = new MessageEmbed()
            .setAuthor({ name: "Only Premium!", iconURL: client.user.displayAvatarURL() })
            .setDescription(`*You need to be a premium to use this command.*`)
            .setColor("#000001")
            .setTimestamp()

        return msg.edit({ content: " ", embeds: [Premiumed] });
        }
    } catch (err) {
        console.log(err)
        msg.edit({ content: "Something went wrong, try again later." })
        }
    }
};