const { readdirSync } = require("fs")
const { white, green } = require("chalk");

module.exports = async (client) => {
    const load = dirs => {
        const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../commands/${dirs}/${file}`);
            client.commands.set(pull.config.name, pull);
            if (pull.config.aliases) pull.config.aliases.forEach(a => client.aliases.set(a, pull.config.name));
          };
        };
        ["Music", "Filters", "Utilities", "Playlist", "Premium"].forEach(x => load(x));
        console.log(white('[') + green('INFO') + white('] ') + green('SlashCommand ') + white('Events') + green(' Loaded!'));
};