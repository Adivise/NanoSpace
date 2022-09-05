const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { Manager } = require("erela.js");
const Spotify = require("better-erela.js-spotify").default;
const AppleMusic = require("better-erela.js-apple").default;
const Deezer = require("erela.js-deezer");
const Facebook = require("erela.js-facebook");

const { TOKEN, PREFIX } = require("./settings/config.js");

for (let i = 0; i < TOKEN.length ; i++) {
      const client = new Client({
          shards: "auto",
          intents: [
              GatewayIntentBits.Guilds,
              GatewayIntentBits.GuildMembers,
              GatewayIntentBits.GuildMessages,
              GatewayIntentBits.GuildVoiceStates,
              GatewayIntentBits.MessageContent,
          ],
          allowedMentions: {
              parse: ["roles", "users", "everyone"],
              repliedUser: false
          },
      });

      client.config = require('./settings/config.js');
      client.prefix = PREFIX[i];
      client.token = TOKEN[i];
      
      client.owner = client.config.OWNER_ID;
      client.dev = client.config.DEV_ID;
      client.color = client.config.EMBED_COLOR;

      process.on('unhandledRejection', error => console.log(error));
      process.on('uncaughtException', error => console.log(error));

      client.manager = new Manager({
        nodes: client.config.NODES,
        autoPlay: true,
        plugins: [
          new Spotify(),
          new Facebook(),
          new Deezer(),
          new AppleMusic()
        ],
        send(id, payload) {
          const guild = client.guilds.cache.get(id);
          if (guild) guild.shard.send(payload);
        },
      });

      ["aliases", "commands"].forEach(x => client[x] = new Collection());
      ["loadCommand", "loadEvent", "loadPlayer"].forEach(x => require(`./handlers/${x}`)(client));

      client.login(client.token);
}