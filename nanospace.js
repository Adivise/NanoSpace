const { Client, Intents, Collection } = require("discord.js");
const { Manager } = require("erela.js");
const { nodes, token } = require("./config.json"); 
require("./structures/PlayerBase.js")

class MainClient extends Client {
	 constructor() {
        super({
            shards: "auto",
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: false
            },
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES, 
                Intents.FLAGS.GUILD_MEMBERS, 
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            ]
        });

    if(!this.token) this.token = token;

    process.on('unhandledRejection', error => console.log(error));
    process.on('uncaughtException', error => console.log(error));

	const client = this;

    this.manager = new Manager({
      nodes: nodes,
      send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    });

    ["aliases", "commands"].forEach(x => client[x] = new Collection());
    ["command", "event", "player"].forEach(x => require(`./handlers/${x}`)(client));

	}
		connect() {
        return super.login(this.token);
    };
};
module.exports = MainClient;