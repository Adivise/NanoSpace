const chalk = require("chalk");

module.exports = async (client, id) => {
    console.log(chalk.yellowBright(`[INFORMATION] (${String(new Date).split(" ", 5).join(" ")}) Shard ${id} Shard reconnected!`));
}