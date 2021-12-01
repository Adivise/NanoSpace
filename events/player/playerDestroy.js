const chalk = require("chalk");

module.exports = async (client, player) => {
	console.log(chalk.red(`[INFORMATION] Player Destroyed from [GUILDID] ${player.guild}`));
}