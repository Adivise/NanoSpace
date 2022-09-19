const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { Manager } = require("erela.js");
const Spotify = require("better-erela.js-spotify").default;
const Deezer = require("erela.js-deezer");
const Tidal  = require("erela.js-tidal");
const AppleMusic = require("better-erela.js-apple").default;
const Facebook = require("erela.js-facebook");
const { I18n } = require("locale-parser");

class MainClient extends Client {
	 constructor() {
        super({
            shards: "auto",
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: false
            },
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.MessageContent,
            ]
        });

    this.config = require("./settings/config.js");
    this.button = require("./settings/button.js");
    this.prefix = this.config.PREFIX;
    this.owner = this.config.OWNER_ID;
    this.dev = this.config.DEV_ID;
    this.color = this.config.EMBED_COLOR;
    this.i18n = new I18n(this.config.LANGUAGE);
    if(!this.token) this.token = this.config.TOKEN;

    process.on('unhandledRejection', error => console.log(error));
    process.on('uncaughtException', error => console.log(error));

	const client = this;

    this.manager = new Manager({
      nodes: this.config.NODES,
      autoPlay: true,
      plugins: [
        new Spotify(),
        new Facebook(),
        new Deezer(),
        new AppleMusic(),
        new Tidal()
      ],
      send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    });

    ["aliases", "commands", "premiums"].forEach(x => client[x] = new Collection());
    ["loadCommand", "loadEvent", "loadPlayer", "loadDatabase"].forEach(x => require(`./handlers/${x}`)(client));

	}
		connect() {
        return super.login(this.token);
    };
};
module.exports = MainClient;
