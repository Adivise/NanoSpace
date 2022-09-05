const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "earrape",
        description: "Destroy your ear!",
        category: "Filters",
        accessableby: "Member",
        aliases: ["ear"]
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Loading please wait....`);

            const player = client.manager.get(message.guild.id);
            if(!player) return msg.edit(`No playing in this guild!`);
            const { channel } = message.member.voice;
            if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`I'm not in the same voice channel as you!`);
    
		await player.setVolume(500);
        const data = {
            op: 'filters',
            guildId: message.guild.id,
        }
        await player.node.send(data);

        const earrapped = new EmbedBuilder()
            .setDescription(`\`💠\` | *Turned on:* \`Earrape\``)
            .setColor(client.color);

        await delay(3000);
        msg.edit({ content: " ", embeds: [earrapped] });
    }
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}