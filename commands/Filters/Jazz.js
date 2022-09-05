const { EmbedBuilder } = require('discord.js');

module.exports = { 
    config: {
        name: "jazz",
        description: "Turning on jazz filter",
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
                    { band: 7, gain: 0.35 },
                    { band: 8, gain: 0.35 },
                    { band: 9, gain: 0.35 },
                    { band: 10, gain: 0.35 },
                    { band: 11, gain: 0.35 },
                    { band: 12, gain: 0.35 },
                    { band: 13, gain: 0.35 },
                ]
            }

            await player.node.send(data);

        const embed = new EmbedBuilder()
            .setDescription(`\`💠\` | *Turned on:* ` + "`Jazz`")
            .setColor(client.color);

        await delay(5000);
        msg.edit({ content: " ", embeds: [embed] });
    }
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}