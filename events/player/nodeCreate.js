const chalk = require("chalk");

module.exports = async (client, node) => {
	console.log(chalk.greenBright(`[INFORMATION] (${String(new Date).split(" ", 5).join(" ")}) Node ${node.options.identifier} Created`));
}