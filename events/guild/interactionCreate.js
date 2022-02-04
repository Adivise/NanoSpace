module.exports = async(client, interaction) => {
    if (interaction.isCommand()) {
        if (!client.slash.has(interaction.commandName)) return;
        if (!interaction.guild) return;
        const command = client.slash.get(interaction.commandName);
        if(!command) return;
        if (!client.dev.includes(interaction.user.id) && client.dev.length > 0) { interaction.reply("The bot is under maintenance. (Please come back again later)"); console.log(`[INFOMATION] ${interaction.user.tag} trying request the command!`); return;}

        if (command) {
            let user = interaction.client.premiums.get(interaction.user.id)
        
            if (!user) {
              const findUser = await PremiumUser.findOne({ Id: interaction.user.id })
              if (!findUser) {
                const newUser = await PremiumUser.create({ Id: interaction.user.id })
                interaction.client.premiums.set(interaction.user.id, newUser)
                user = newUser
              } else return
            }  

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
                if (interaction.user.id !== client.owner) {
                    return interaction.editReply({ content: "You not owner the bot can't use this command!" });
                }
            }
            command.run(interaction, client, user);

        } catch (e) {
            console.log(e)
            await interaction.editReply({ content: "Something went wrong!", ephemeral: true });
        }}
    }
}