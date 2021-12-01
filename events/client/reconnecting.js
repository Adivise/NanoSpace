const chalk = require('chalk');

module.exports = async (client) => {
    console.log(chalk.red(`[RECONNECTED] ${client.user.tag} (${client.user.id})`));
};
