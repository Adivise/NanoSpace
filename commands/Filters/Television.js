const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "television",
        description: "Turning on television filter",
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
                equalizer: [
                    { band: 0, gain: 0 },
                    { band: 1, gain: 0 },
                    { band: 2, gain: 0 },
                    { band: 3, gain: 0 },
                    { band: 4, gain: 0 },
                    { band: 5, gain: 0 },
                    { band: 6, gain: 0 },
                    { band: 7, gain: 0.65 },
                    { band: 8, gain: 0.65 },
                    { band: 9, gain: 0.65 },
                    { band: 10, gain: 0.65 },
                    { band: 11, gain: 0.65 },
                    { band: 12, gain: 0.65 },
                    { band: 13, gain: 0.65 },
                ]
            }

            await player.node.send(data);

        const embed = new EmbedBuilder()
            .setDescription(`\`💠\` | *Turned on:* ` + "`Television`")
            .setColor(client.color);

        await delay(5000);
        msg.edit({ content: " ", embeds: [embed] });
    }
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}