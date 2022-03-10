const { MessageEmbed } = require('discord.js');
const formatDuration = require('../../structures/formatduration.js')

const rewindNum = 10;

module.exports = { 
    name: "rewind",
    description: "Rewind timestamp in the song!",
    options: [
        {
            name: "seconds",
            description: "Rewind timestamp in the song!",
            type: 4,
        }
    ],
    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });
        const value = interaction.options.getInteger("seconds");
        const msg = await interaction.editReply(`${client.i18n.get(language, "music", "rewind_loading")}`);

		const player = client.manager.get(interaction.guild.id);
		if (!player) return msg.edit(`${client.i18n.get(language, "noplayer", "no_player")}`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return msg.edit(`${client.i18n.get(language, "noplayer", "no_voice")}`);

        const CurrentDuration = formatDuration(player.position);

        if(value && !isNaN(value)) {
			if((player.position - value * 1000) > 0) {
                await player.seek(player.position - value * 1000);
                
                const rewind1 = new MessageEmbed()
                .setDescription(`${client.i18n.get(language, "music", "rewind_msg", {
                    duration: CurrentDuration,
                })}`)
                .setColor(client.color);

                msg.edit({ content: " ", embeds: [rewind1] });
			}
			else {
				return msg.edit(`${client.i18n.get(language, "music", "rewind_beyond")}`);
			}
		}
		else if(value && isNaN(value)) {
			return msg.edit(`${client.i18n.get(language, "music", "rewind_invalid", {
                prefix: "/"
            })}`);
		}

		if(!value) {
			if((player.position - rewindNum * 1000) > 0) {
                await player.seek(player.position - rewindNum * 1000);
                
                const rewind2 = new MessageEmbed()
                .setDescription(`${client.i18n.get(language, "music", "rewind_msg", {
                    duration: CurrentDuration,
                })}`)
                .setColor(client.color);

                msg.edit({ content: " ", embeds: [rewind2] });
			}
			else {
				return msg.edit(`${client.i18n.get(language, "music", "rewind_beyond")}`);
			}
		}
	}
};