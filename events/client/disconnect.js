const chalk = require('chalk');

module.exports = async (client) => {
    console.log(chalk.red(`[DISCONNECTED] ${client.user.tag} (${client.user.id})`));
};
