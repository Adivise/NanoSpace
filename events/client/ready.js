const figlet = require('figlet');
const chalk = require('chalk');

module.exports = async (client) => {
    client.manager.init(client.user.id);
    figlet(client.user.tag, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.red.bold(data));
    });
    client.user.setActivity(`/play | ${client.guilds.cache.size} servers`, { type: "WATCHING" });
};
