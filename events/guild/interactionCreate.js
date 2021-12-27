const { OWNER_ID } = require('../../config.json');

module.exports = async(client, interaction) => {
    if (interaction.isCommand()) {
        if (!client.slash.has(interaction.commandName)) return;
        if (!interaction.guild) return;
        const command = client.slash.get(interaction.commandName);
        if(!command) return;

        try {
            if (command.userPerms) {
                if (!interaction.member.permissions.has(command.userPerms)) {
                    return interaction.editReply({ content: `You don't have perm ${command.userPerms} to use this command!` });
            }
        }
            if (command.botPerms) {
                if (!interaction.guild.me.permissions.has(command.botPerms)) {
                    return interaction.editReply({ content: `I don't have perm ${command.botPerms} to use this command!` });
            }
        }

            if (command.ownerOnly) {
                if (interaction.user.id !== OWNER_ID) {
                    return interaction.editReply({ content: "You not owner the bot can't use this command!" });
                }
            }
            command.run(interaction, client);

        } catch (e) {
            console.log(e)
            await interaction.editReply({ content: "Something went wrong!", ephemeral: true });
        }
    }
}