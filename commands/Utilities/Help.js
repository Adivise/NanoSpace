const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        usage: "(command)",
        category: "Utilities",
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const embed = new EmbedBuilder()
            .setColor('#000001')
            .setAuthor({ name: `${message.guild.members.me.displayName} Help Command!`, iconURL: message.guild.iconURL({ dynamic: true })})
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }));

        if(!args[0]) {
            const categories = readdirSync("./commands/")

            embed.setDescription(`The bot prefix is: **${client.prefix}**`)
            embed.setFooter({ text: `© ${message.guild.members.me.displayName} | Total Commands: ${client.commands.size}`, iconURL: client.user.displayAvatarURL({ dynamic: true })});

            categories.forEach(category => {
                const dir = client.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addFields({ name: `❯ ${capitalise} [${dir.size}]:`, value: dir.map(c => `\`${c.config.name}\``).join(" "), inline: false })
                } catch(e) {
                    console.log(e)
                }
            });

            return message.channel.send({ embeds: [embed] })
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send({ embeds: [embed.setTitle("Invalid Command.").setDescription(`Do \`${client.prefix}help\` for the list of the commands.`)] })
            command = command.config

            embed.setDescription(stripIndents`The client's prefix is: \`${client.prefix}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No Description provided."}
            **Usage:** ${command.usage ? `\`${client.prefix}${command.name} ${command.usage}\`` : "No Usage"}
            **Accessible by:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

            return message.channel.send({ embeds: [embed] })
        }
    }
}