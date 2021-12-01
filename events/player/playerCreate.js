const chalk = require("chalk");

module.exports = async (client, player) => {
	console.log(chalk.green(`[INFORMATION] Player Created from [GUILDID] ${player.guild}`));
}