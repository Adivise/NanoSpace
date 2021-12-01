const chalk = require("chalk");

module.exports = async (client, id) => {
    console.log(chalk.redBright(`[WARNING] (${String(new Date).split(" ", 5).join(" ")}) Shard ${id} Shard Disconnected!`));
}