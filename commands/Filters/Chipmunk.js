const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "chipmunk",
        description: "Turning on chipmunk filter",
        category: "Filters",
        accessableby: "Member",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Loading please wait....`);

            const player = client.manager.get(message.guild.id);
            if(!player) return msg.edit(`No playing in this guild!`);
            const { channel } = message.member.voice;
            if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`I'm not in the same voice channel as you!`);

            const data = {
                op: 'filters',
                guildId: message.guild.id,
                timescale: {
                    speed: 1.05,
                    pitch: 1.35,
                    rate: 1.25
                },
            }

            await player.node.send(data);

        const embed = new EmbedBuilder()
            .setDescription(`\`💠\` | *Turned on:* \`Chipmunk\``)
            .setColor(client.color);

        await delay(5000);
        msg.edit({ content: " ", embeds: [embed] });
    }
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}