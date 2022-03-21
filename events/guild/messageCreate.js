const { Permissions, MessageEmbed } = require("discord.js");
const GPrefix = require('../../settings/models/Prefix.js');
const GLang = require('../../settings/models/Language.js');
const Premium = require('../../settings/models/Premium.js');
const chalk = require('chalk');

module.exports = async (client, message) => { 
    if(message.author.bot || message.channel.type === "dm") return;

    let PREFIX = client.prefix;
    let LANGUAGE = client.i18n;
    
    const GuildPrefix = await GPrefix.findOne({ guild: message.guild.id });
    if(GuildPrefix && GuildPrefix.prefix) PREFIX = GuildPrefix.prefix;

		let guildModel = await GLang.findOne({ guild: message.guild.id });
    if(guildModel && guildModel.language) LANGUAGE = guildModel.language;

    const prefix = PREFIX;
    const language = LANGUAGE;

    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);

    if(message.content.match(mention)) {
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setDescription(client.i18n.get(language, "message", "my_prefix", {
            prefix: prefix || client.prefix,
          }),
        );
      message.channel.send({ embeds: [embed] })
    };
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [ matchedPrefix ] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(!command) return;
    if (!client.dev.includes(message.author.id) && client.dev.length > 0) { 

      message.channel.send(`${client.i18n.get(language, "message", "dev_only")}`);
      console.log(chalk.bgRedBright(`[INFOMATION] ${message.author.tag} trying request the command from ${message.guild.name}`)); 
      return;
    }

    console.log(chalk.magenta(`[COMMAND] ${command.config.name} used by ${message.author.tag} from ${message.guild.name}`));

    if(!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return await message.author.dmChannel.send(`${client.i18n.get(language, "message", "no_perms")}`);
    if(!message.guild.me.permissions.has(Permissions.FLAGS.VIEW_CHANNEL)) return;
    if(!message.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) return await message.channel.send(`${client.i18n.get(language, "message", "no_perms")}`);
    if(!message.guild.me.permissions.has(Permissions.FLAGS.SPEAK)) return await message.channel.send(`${client.i18n.get(language, "message", "no_perms")}`);
    if(!message.guild.me.permissions.has(Permissions.FLAGS.CONNECT)) return await message.channel.send(`${client.i18n.get(language, "message", "no_perms")}`);
    
    if (command) {
      let user = message.client.premiums.get(message.author.id)
  
      if (!user) {
        const findUser = await Premium.findOne({ Id: message.author.id })
        if (!findUser) {
          const newUser = await Premium.create({ Id: message.author.id })
          message.client.premiums.set(message.author.id, newUser)
          user = newUser
        } else return
      }  

      try {
        if (command.ownerOnly) {
          if (message.author.id !== client.owner) {
              return message.channel.send(`${client.i18n.get(language, "message", "owner_only")}`);
          }
      }
          command.run(client, message, args, user, language, prefix);
      } catch (error) {
        console.log(error)
        await message.channel.send(`${client.i18n.get(language, "message", "error")}`);
    }
  }
}