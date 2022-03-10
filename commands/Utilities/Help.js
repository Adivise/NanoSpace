const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
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

            const embed = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`${client.i18n.get(language, "utilities", "help_desc")}`)

            const row = new MessageActionRow()
                .addComponents([
                    new MessageSelectMenu()
                        .setCustomId("help-category")
                        .setPlaceholder(`${client.i18n.get(language, "utilities", "help_desc")}`)
                        .addOptions([
                            categories.map(category => {
                                return {
                                    label: `${category[0].toUpperCase() + category.slice(1)}`,
                                    value: category,
                                    description: `${client.i18n.get(language, "utilities", "help_category_desc", {
                                        category: category
                                    })}`
                                }
                            })
                        ])
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

                                    const embed = new MessageEmbed()
                                    .setAuthor({ name: `${message.guild.me.displayName} Help Command!`, iconURL: message.guild.iconURL({ dynamic: true })})
                                    .setDescription(`The bot prefix is: \`${prefix}\``)
                                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
                                    .setColor(client.color)
                                    .addField(`❯  ${directory.toUpperCase()} [${client.commands.filter(c => c.config.category === directory).size}]`, `${client.commands.filter(c => c.config.category === directory).map(c => `\`${c.config.name}\``).join(", ")}`)
                                    .setFooter({ text: `© ${message.guild.me.displayName} | Total Commands: ${client.commands.size}`, iconURL: client.user.displayAvatarURL({ dynamic: true })})

                                    msg.edit({ embeds: [embed] });
                            }
                        }
                    });
                        collector.on('end', async (collected, reason) => {
                            if(reason === 'time') {
                                const timed = new MessageEmbed()
                                .setDescription(`${client.i18n.get(language, "utilities", "help_timeout", {
                                    prefix: prefix
                                })}`)
                                .setColor(client.color)

                                msg.edit({ embeds: [timed], components: [] });
                            }
                        });
                })
        } else {
            const embed = new MessageEmbed()
                .setAuthor({ name: `${message.guild.me.displayName} Help Command!`, iconURL: message.guild.iconURL({ dynamic: true })})
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
