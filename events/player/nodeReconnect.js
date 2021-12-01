const chalk = require("chalk");

module.exports = async (client, node) => {
	console.log(chalk.yellowBright(`[INFOMATION] (${String(new Date).split(" ", 5).join(" ")}) Node ${node.options.identifier} Reconnected`));
}