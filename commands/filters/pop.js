const delay = require('delay');
const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { pop } = require('../../config/filter');

module.exports = { 
    config: {
        name: "pop",
        description: "Turning on pop filter",
        category: "filters",
        accessableby: "Member",
        aliases: []
    },

    run: async (client, message) => {
        const msg = await message.channel.send("Turning on **Pop**. This may take a few seconds...");

        const player = client.manager.get(message.guild.id);
        if(!player) return msg.edit("No song/s currently playing in this guild.");
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        player.setFilter('filters', pop);

        const popped = new MessageEmbed()
            .setAuthor({ name: "Turned on: Pop", iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
            .setColor('#000001');

        await delay(5000);
        msg.edit({ content: " ", embeds: [popped] });
            console.log(chalk.magenta(`[COMMAND] Pop used by ${message.author.tag} from ${message.guild.name}`));
   }
};