const chalk = require('chalk');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = {
    ownerOnly: true,
    config: {
        name: "deployglobal",
        description: "Deploy global slash command to all server!",
        category: "utilities",
        accessableby: "Owner",
        aliases: ["dpsg"]
    },
    run: async (client, message, args) => {

    const rest = new REST({ version: "9" }).setToken(client.token);

    (async () => {
        try {
            console.log(chalk.yellowBright(`[DEPLOY] Starting deploy [Application (/)] to ${client.guilds.cache.size} total guilds!`));
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: client.loadslash },
            );
            console.log(chalk.yellow(`[DEPLOY] Successfully deploy [Application (/)] to ${client.guilds.cache.size} total guilds!`));
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
        .setDescription(`Successfully deploy [Application (/)] to \`${client.guilds.cache.size} total guilds!\`\n\`\`\`Note: Make sure slashcommand working please invite again!\`\`\`\n\n**Note:** This command will take a while to deploy to all guilds (wait 1 - 2 hrs.)!`)
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