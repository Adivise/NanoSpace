const chalk = require('chalk');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = {
    config: {
        name: "deploy",
        description: "Deploy slash command to the server!",
        usage: "",
        category: "utilities",
        accessableby: "Owner",
        aliases: ["dps"]
    },
    run: async (client, message, args) => {
    if(message.author.id != client.owner) return message.channel.send("You're not the client owner!")
    console.log(chalk.red(`[COMMAND] Deploy used by ${message.author.tag} from ${message.guild.name}`));

    const rest = new REST({ version: "9" }).setToken(client.token);

    (async () => {
        try {
            console.log(chalk.yellowBright(`[DEPLOY] Starting deploy [Application (/)] to ${message.guild.name}(${message.guild.id})`));
            await rest.put(
                Routes.applicationGuildCommands(client.user.id, message.guild.id),
                { body: client.loadslash },
            );
            console.log(chalk.yellow(`[DEPLOY] Successfully deploy [Application (/)] to ${message.guild.name}(${message.guild.id})`));
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
        .setDescription(`Successfully deploy [Application (/)] to \`${message.guild.name}\`\n\`\`\`Note: Make sure slashcommand working please invite again!\`\`\``)
        .setColor("#000001")
        .setFooter({ text: `Deployed by ${message.author.tag}`});

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel("Replace Invite!")
                .setEmoji("🔗")
                .setStyle("LINK")
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2251376897&scope=bot%20applications.commands`)
        );

    await message.channel.send({ embeds: [embed], components: [row] });

    }
};