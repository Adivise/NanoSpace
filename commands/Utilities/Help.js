const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, SelectMenuOptionBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        usage: "<command>",
        category: "Utilities",
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (client, message, args, user, language, prefix) => {
        if(!args[0]) {
            const categories = readdirSync("./commands/")

            const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`${client.i18n.get(language, "utilities", "help_desc")}`)

            const row = new ActionRowBuilder()
                .addComponents([
                    new SelectMenuBuilder()
                        .setCustomId("help-category")
                        .setPlaceholder(`${client.i18n.get(language, "utilities", "help_desc")}`)
                        .setMaxValues(1)
                        .setMinValues(1)
                        /// Map the categories to the select menu
                        .setOptions(categories.map(category => {
                            return new SelectMenuOptionBuilder()
                                .setLabel(category)
                                .setValue(category)
                            }
                        ))
                    ])

                    message.channel.send({ embeds: [embed], components: [row] }).then(async (msg) => {
                        let filter = (i) => (i.isSelectMenu()) && i.user && i.message.author.id == client.user.id;
                        let collector = await msg.createMessageComponentCollector({ 
                            filter,
                            time: 60000 
                        });
                        collector.on('collect', async (m) => {
                            if(m.isSelectMenu()) {
                                if(m.customId === "help-category") {
                                    await m.deferUpdate();
                                    let [directory] = m.values;

                                    const embed = new EmbedBuilder()
                                    .setAuthor({ name: `${message.guild.members.me.displayName} Help Command!`, iconURL: message.guild.iconURL({ dynamic: true })})
                                    .setDescription(`The bot prefix is: \`${prefix}\``)
                                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
                                    .setColor(client.color)
                                    .addFields({ name: `❯  ${directory.toUpperCase()} [${client.commands.filter(c => c.config.category === directory).size}]`, value: `${client.commands.filter(c => c.config.category === directory).map(c => `\`${c.config.name}\``).join(", ")}`, inline: false })
                                    .setFooter({ text: `© ${message.guild.members.me.displayName} | Total Commands: ${client.commands.size}`, iconURL: client.user.displayAvatarURL({ dynamic: true })})

                                    msg.edit({ embeds: [embed] });
                            }
                        }
                    });
                        collector.on('end', async (collected, reason) => {
                            if(reason === 'time') {
                                const timed = new EmbedBuilder()
                                .setDescription(`${client.i18n.get(language, "utilities", "help_timeout", {
                                    prefix: prefix
                                })}`)
                                .setColor(client.color)

                                msg.edit({ embeds: [timed], components: [] });
                            }
                        });
                })
        } else {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${message.guild.members.me.displayName} Help Command!`, iconURL: message.guild.iconURL({ dynamic: true })})
                .setDescription(`The bot prefix is: **${prefix}**`)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }));

            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send({ embeds: [embed.setTitle("Invalid Command.").setDescription(`Do \`${prefix}help\` for the list of the commands.`)] })
            command = command.config

            embed.setDescription(stripIndents`The client's prefix is: \`${prefix}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No Description provided."}
            **Usage:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}
            **Accessible by:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

            return message.channel.send({ embeds: [embed] })
        }
    }
}
