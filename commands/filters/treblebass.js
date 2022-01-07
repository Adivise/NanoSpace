const delay = require('delay');
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { treblebass } = require('../../config/filter');

module.exports = { 
    config: {
        name: "treblebass",
        description: "Turning on treblebass filter",
        category: "filters",
        accessableby: "Member",
        aliases: ["tb"]
    },

    run: async (client, message) => {
        const msg = await message.channel.send("Turning on **Treblebass**. This may take a few seconds...");

        const player = client.manager.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        await player.setFilter('filters', treblebass);

        const tbed = new MessageEmbed()
            .setAuthor({ name: "Turned on: TrebleBass", iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
            .setColor('#000001');

        await delay(5000);
        msg.edit({ content: " ", embeds: [tbed] });
            console.log(chalk.magenta(`[COMMAND] Treblebass used by ${message.author.tag} from ${message.guild.name}`));
   }
};