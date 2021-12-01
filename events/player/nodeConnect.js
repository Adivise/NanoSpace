const chalk = require("chalk");
const delay = require("delay");

module.exports = async (client, node) => {
	await delay(4000);
	console.log(chalk.green(`[INFORMATION] (${String(new Date).split(" ", 5).join(" ")}) Node ${node.options.identifier} Connected`));
}