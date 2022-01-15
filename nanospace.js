const { Client, Intents, Collection } = require("discord.js");
const { Manager } = require("erela.js");
const spotify = require("better-erela.js-spotify").default;
const deezer = require("erela.js-deezer");
const apple = require("erela.js-apple");
const facebook = require("erela.js-facebook");

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

    this.config = require("./settings/config.js");
    this.prefix = this.config.PREFIX;
    this.owner = this.config.OWNER_ID;
    if(!this.token) this.token = this.config.TOKEN;

    process.on('unhandledRejection', error => console.log(error));
    process.on('uncaughtException', error => console.log(error));

	const client = this;

    this.manager = new Manager({
      nodes: this.config.NODES,
      plugins: [
        new spotify(),
        new deezer(),
        new facebook(),
        new apple(),
      ],
      send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    });

    ["aliases", "slash", "commands"].forEach(x => client[x] = new Collection());
    ["loadCommand", "loadSlashCommand", "loadEvent", "loadPlayer"].forEach(x => require(`./handlers/${x}`)(client));

	}
		connect() {
        return super.login(this.token);
    };
};
module.exports = MainClient;