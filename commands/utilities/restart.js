const chalk = require('chalk');
const { RichEmbed } = require('discord.js');
const { ownerid } = require('../../config.json');

module.exports = {
    config: {
        name: "restart",
        description: "shuts down the bot!",
        usage: "shutdown",
        category: "utilities",
        accessableby: "Bot Owner",
        aliases: ["stopbot"]
    },
    run: async (bot, message, args) => {
    if(message.author.id != ownerid) return message.channel.send("You're the bot the owner!")

    const restart = new RichEmbed()
    .setDescription("**Account has been**: `Shutting down...`")
    .setColor("#000001");

        await message.channel.send(restart)
            console.log(chalk.red(`  [Bot]: Restarting...`));
            
        process.exit();
      }
};