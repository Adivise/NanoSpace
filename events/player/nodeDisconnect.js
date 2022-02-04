const chalk = require("chalk");

module.exports = async (client, node, reason) => {
	console.log(chalk.redBright(`[WARNING] (${String(new Date).split(" ", 5).join(" ")}) Node ${node.options.identifier} Disconnected: ${reason.toString()}`));
}