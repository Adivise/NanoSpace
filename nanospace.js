const { Client, Intents, Collection } = require("discord.js");
const { Manager } = require("erela.js");
const spotify = require("erela.js-spotify");
const deezer = require("erela.js-deezer");
const apple = require("erela.js-apple");
const facebook = require("erela.js-facebook");
const { nodes, token, SpotifyID, SpotifySecret } = require("./config.json"); 

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
      plugins: [
        new spotify({
            clientID: SpotifyID,
            clientSecret: SpotifySecret,
        }),
        new deezer(),
        new facebook(),
        new apple(),
      ],
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