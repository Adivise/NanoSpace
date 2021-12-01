const chalk = require('chalk');

module.exports = async (client) => {
    console.log(chalk.yellowBright(`[WARN] ${client.user.tag} (${client.user.id})`));
};
