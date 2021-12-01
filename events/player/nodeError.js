const chalk = require("chalk");

module.exports = async (client, node, error) => {
	console.log(chalk.red(`[ERROR] (${String(new Date).split(" ", 5).join(" ")}) Node ${node.options.identifier} Error: ${error}`));
}