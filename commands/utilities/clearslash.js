const chalk = require('chalk');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = {
    config: {
        name: "clearslash",
        description: "Clear slash command in the server!",
        usage: "",
        category: "utilities",
        accessableby: "Owner",
        aliases: ["cdps"]
    },
    run: async (client, message, args) => {
    if(message.author.id != client.owner) return message.channel.send("You're not the client owner!")
    console.log(chalk.red(`[COMMAND] ClearSlash used by ${message.author.tag} from ${message.guild.name}`));

    const rest = new REST({ version: "9" }).setToken(client.token);

    (async () => {
        try {
            console.log(chalk.yellowBright(`[DEPLOY] Clearing [Application (/)] to ${message.guild.name}(${message.guild.id})`));
            await rest.put(
                Routes.applicationGuildCommands(client.user.id, message.guild.id),
                { body: [] },
            );
            console.log(chalk.yellow(`[DEPLOY] Successfully clear [Application (/)] to ${message.guild.name}(${message.guild.id})`));
        } catch (error) {
            console.log(error);
            const embed = new MessageEmbed()
                .setDescription("Something went wrong!")
                .setColor("#000001");

            message.channel.send({ embed });
        }
    })();

    const embed = new MessageEmbed()
        .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(`Successfully clear [Application (/)] to \`${message.guild.name}\``)
        .setColor("#000001")
        .setFooter({ text: `Deployed by ${message.author.tag}`});

    await message.channel.send({ embeds: [embed] });

    }
};