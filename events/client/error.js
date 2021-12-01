const chalk = require('chalk');

module.exports = async (client) => {
    console.log(chalk.red(`[ERROR] ${client.user.tag} (${client.user.id})`));
};
