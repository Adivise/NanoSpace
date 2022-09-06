const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "volume",
        aliases: ["vol", "v"],
        description: "Adjusts the volume of the bot.",
        accessableby: "Member",
        category: "Music",
        usage: "<input>"
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Loading please wait....`);

		const player = client.manager.get(message.guild.id);
		if (!player) return msg.edit(`No playing in this guild!`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`I'm not in the same voice channel as you!`);

        if (!args[0]) return msg.edit(`*Current volume:* ${player.volume}%`);
        if (Number(args[0]) <= 0 || Number(args[0]) > 100) return msg.edit(`Please provide a volume between 1 and 100.`);

        await player.setVolume(Number(args[0]));

        const changevol = new EmbedBuilder()
            .setDescription(`\`🔈\` | *Volume set to:* \`${args[0]}%\``)
            .setColor(client.color);
        
        msg.edit({ content: " ", embeds: [changevol] });
    }
}