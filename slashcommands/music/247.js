const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "247",
    description: "make 24/7 in voice channel!",
    run: async (interaction, client, user) => {
        await interaction.deferReply({ ephemeral: false });
        const msg = await interaction.editReply(`**Loading please wait...**`);

		const player = client.manager.get(interaction.guild.id);
		if (!player) return msg.edit("No song/s currently playing within this guild.");

        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.");

        try {
            if (user && user.isPremium) {
        if (player.twentyFourSeven) {
            player.twentyFourSeven = false;
            const off = new MessageEmbed()
            .setDescription("\`🌙\` | **Mode 24/7 has been:** `Deactivated`")
            .setColor('#000001');

            msg.edit({ content: " ", embeds: [off] });
        } else {
            player.twentyFourSeven = true;
            const on = new MessageEmbed()
            .setDescription("\`🌕\` | **Mode 24/7 has been:** `Activated`")
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