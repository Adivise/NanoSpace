const { EmbedBuilder } = require("discord.js");
const GLang = require("../../settings/models/Language.js");
const Setup = require("../../settings/models/Setup.js");

module.exports = async (client, interaction) => {
    if (!interaction.guild || interaction.user.bot) return;
    if (interaction.isButton()) {
        const { customId, member } = interaction;
        let voiceMember = interaction.guild.members.cache.get(member.id);
        let channel = voiceMember.voice.channel;

        let player = await client.manager.get(interaction.guild.id);
        if (!player) return;

        const playChannel = client.channels.cache.get(player.textChannel);
        if (!playChannel) return;
    
        const guildModel = await GLang.findOne({ guild: channel.guild.id });
        const { language } = guildModel;

        const db = await Setup.findOne({ guild: playChannel.guild.id });
        if (db.enable === false) return;

        // Here delete interaction.reply!
        setTimeout(() => interaction.deleteReply(), 4000);

        switch (customId) {
            case "sprevious":
                {
                    if (!channel) { 
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                    } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                    } else if (!player || !player.queue.previous) {
                        return interaction.reply(`${client.i18n.get(language, "music", "previous_notfound")}`);
                    } else {
                        await player.queue.unshift(player.queue.previous);
                        await player.stop();

                        const embed = new EmbedBuilder()
                            .setDescription(`${client.i18n.get(language, "music", "previous_msg")}`)
                            .setColor(client.color);

                        interaction.reply({ embeds: [embed] });
                    }
                }
                break;

            case "sskip":
                {
                    if (!channel) { 
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                    } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                    } else if (!player) {
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_player")}`);
                    } else {}
                    if (player.queue.size == 0) {
                        await player.destroy();
                        await client.UpdateMusic(player);

                        const embed = new EmbedBuilder()
                            .setDescription(`${client.i18n.get(language, "music", "skip_msg")}`)
                            .setColor(client.color);

                        interaction.reply({ embeds: [embed] });
                    } else {
                        await player.stop();

                        const embed = new EmbedBuilder()
                            .setDescription(`${client.i18n.get(language, "music", "skip_msg")}`)
                            .setColor(client.color);

                        interaction.reply({ embeds: [embed] });
                    }
                }
                break;

            case "sstop":
                {
                    if (!channel) { 
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                    } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                    } else if (!player) {
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_player")}`);
                    } else {
                        await player.destroy();
                        await client.UpdateMusic(player);

                        const embed = new EmbedBuilder()
                            .setDescription(`${client.i18n.get(language, "player", "stop_msg")}`)
                            .setColor(client.color);

                        interaction.reply({ embeds: [embed] });
                    }
                }
                break;

            case "spause":
                {
                    if (!channel) { 
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                    } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                    } else if (!player) {
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_player")}`);
                    } else {
                        await player.pause(!player.paused);
                        const uni = player.paused ? `${client.i18n.get(language, "player", "switch_pause")}` : `${client.i18n.get(language, "player", "switch_resume")}`;

                        const embed = new EmbedBuilder()
                            .setDescription(`${client.i18n.get(language, "player", "pause_msg", {
                            pause: uni,
                            })}`)
                            .setColor(client.color);

                        interaction.reply({ embeds: [embed] });
                    }
                }
                break;

            case "sloop":
                {
                    if (!channel) { 
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                    } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_voice")}`);
                    } else if (!player) {
                        return interaction.reply(`${client.i18n.get(language, "noplayer", "no_player")}`);
                    } else {
                        await player.setQueueRepeat(!player.queueRepeat);
                        const uni = player.queueRepeat ? `${client.i18n.get(language, "player", "switch_enable")}` : `${client.i18n.get(language, "player", "switch_disable")}`;
                
                        const embed = new EmbedBuilder()
                            .setDescription(`${client.i18n.get(language, "player", "repeat_msg", {
                            loop: uni,
                            })}`)
                            .setColor(client.color);

                        interaction.reply({ embeds: [embed] });
                    }
                }
            break;
        default:
            break;
        }
    }
}