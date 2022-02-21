const { MessageEmbed } = require('discord.js');
const GLang = require('../../settings/models/Language.js');

module.exports = {
    config: {
        name: "language",
        aliases: ["setlang", "lang"],
        usage: "<language>",
        category: "utilities",
        description: "Change the language for the bot",
        accessableby: "Members"
    },
    run: async (client, message, args, user, language, prefix) => {

        if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send(`${client.i18n.get(language, "utilities", "lang_perm")}`);
        if(!args[0]) return message.channel.send(`${client.i18n.get(language, "utilities", "lang_arg")}`);
        const languages = client.i18n.getLocales();
        if (!languages.includes(args[0])) return message.channel.send(`${client.i18n.get(language, "utilities", "provide_lang", {
            languages: languages.join(', ')
        })}`);

        const newLang = await GLang.findOne({ guild: message.guild.id });
        if(!newLang) {
            const newLang = new GLang({
                guild: message.guild.id,
                language: args[0]
            });
            newLang.save().then(() => {
                const embed = new MessageEmbed()
                .setDescription(`${client.i18n.get(language, "utilities", "lang_set", {
                    language: args[0]
                })}`)
                .setColor('#000001')

                message.channel.send({ embeds: [embed] });
            }
            ).catch(() => {
                message.channel.send(`${client.i18n.get(language, "utilities", "Lang_error")}`);
            });
        }
        else if(newLang) {
            newLang.language = args[0];
            newLang.save().then(() => {
                const embed = new MessageEmbed()
                .setDescription(`${client.i18n.get(language, "utilities", "lang_change", {
                    language: args[0]
                })}`)
                .setColor('#000001')
    
                message.channel.send({ embeds: [embed] });
            }
            ).catch(() => {
                message.channel.send(`${client.i18n.get(language, "utilities", "Lang_error")}`);
            });
        }
    }
}