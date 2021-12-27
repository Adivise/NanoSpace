const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config.json')

module.exports = { 
    name: "skipto",
    description: "Skips to a certain song in the queue.",
    botPerms: ["SEND_MESSAGES", "EMBED_LINKS", "CONNECT", "SPEAK"],
    options: [
        {
            name: "position",
            description: "The position of the song in the queue.",
            type: 4,
            required: true,
        }
    ],
    run: async (interaction, client) => {
        await interaction.deferReply({ ephemeral: false });
        const value = interaction.options.getInteger("position");
        const msg = await interaction.editReply(`**Skippin' to ${value}...**`);

		if (value === 0) return msg.edit(`Cannot skip to a song that is already playing. To skip the current playing song type: \`/skip\``);

		const player = client.manager.get(interaction.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

		if ((value > player.queue.length) || (value && !player.queue[value - 1])) return msg.edit('Song not found');
		if (value == 1) player.stop();
		await player.queue.splice(0, value - 1);
        await player.stop();
        
        const skipto = new MessageEmbed()
            .setDescription("\`⏭\` | **Song has been:** " + `\`Skipto\``)
            .setColor('#000001');

        msg.edit({ content: " ", embeds: [skipto] });
            console.log(chalk.magenta(`[SLASHCOMMAND] Skipto used by ${interaction.user.tag} from ${interaction.guild.name}`));
    }
}