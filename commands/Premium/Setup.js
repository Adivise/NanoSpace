const { EmbedBuilder, AttachmentBuilder, PermissionsBitField } = require('discord.js');
const Setup = require("../../settings/models/Setup.js");

module.exports = { 
    config: {
        name: "setup",
        description: "Setup song request channel!",
        accessableby: "Member",
        category: "Premium",
    },
    run: async (client, message, args, user, language, prefix) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.channel.send(`${client.i18n.get(language, "utilities", "lang_perm")}`);
        try {
            if (user && user.isPremium) {
                await message.guild.channels.create({
                    name: "song-request",
                    type: 0, // 0 = text, 2 = voice
                    topic: `${client.i18n.get(language, "setup", "setup_topic")}`,
                    parent_id: message.channel.parentId,
                    user_limit: 3,
                    rate_limit_per_user: 3, 
                }).then(async (channel) => {

                const attachment = new AttachmentBuilder("./settings/images/banner.png", { name: "setup.png" });

                const queueMsg = `${client.i18n.get(language, "setup", "setup_queuemsg")}`;

                const playEmbed = new EmbedBuilder()
                    .setColor(client.color)
                    .setAuthor({ name: `${client.i18n.get(language, "setup", "setup_playembed_author")}` })
                    .setImage(`${client.i18n.get(language, "setup", "setup_playembed_image")}`)
                    .setDescription(`${client.i18n.get(language, "setup", "setup_playembed_desc")}`)
                    .setFooter({ text: `${client.i18n.get(language, "setup", "setup_playembed_footer", {
                        prefix: client.prefix
                    })}` });

                await channel.send({ files: [attachment] });
                    await channel.send({ content: `${queueMsg}`, embeds: [playEmbed], components: [client.diSwitch] }).then(async (playmsg) => {
                        await Setup.findOneAndUpdate({ guild: message.guild.id }, {
                            guild: message.guild.id,
                            enable: true,
                            channel: channel.id,
                            playmsg: playmsg.id,
                        });
                        const embed = new EmbedBuilder()
                            .setDescription(`${client.i18n.get(language, "setup", "setup_msg", {
                                channel: channel,
                            })}`)
                            .setColor(client.color);

                        return message.channel.send({ embeds: [embed] });
                    })
                });
            } else {
                    const embed = new EmbedBuilder()
                        .setAuthor({ name: `${client.i18n.get(language, "nopremium", "premium_author")}`, iconURL: client.user.displayAvatarURL() })
                        .setDescription(`${client.i18n.get(language, "nopremium", "premium_desc")}`)
                        .setColor(client.color)
                        .setTimestamp()
            
                    return message.channel.send({ content: " ", embeds: [embed] });
                }
        } catch (err) {
            console.log(err)
            message.channel.send({ content: `${client.i18n.get(language, "nopremium", "premium_error")}` })
        }
    }
};