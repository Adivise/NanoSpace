const delay = require('delay');
const chalk = require("chalk");
const { readdirSync } = require('fs');

module.exports = async (client) => {
    const loadcommand = dirs =>{
        const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of events) {
            const evt = require(`../events/${dirs}/${file}`);
            const eName = file.split('.')[0];
            client.on(eName, evt.bind(null, client));
        }
    };
    ["client", "guild"].forEach((x) => loadcommand(x));
    await delay(4000);
    console.log(chalk.greenBright(`[INFORMATION] Global Events Loaded`));
};