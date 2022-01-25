const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const Playlist = require('../../settings/models/Playlist.js');
const Premium = require('../../settings/models/Premium.js');

module.exports = { 
    config: {
        name: "delete",
        aliases: [],
        description: "Delete a playlist",
        accessableby: "Member",
        category: "playlist",
    },
    run: async (client, message, args) => {
        console.log(chalk.magenta(`[COMMAND] Delete used by ${message.author.tag} from ${message.guild.name}`));

        const premium = await Premium.findOne({ member: message.author.id });
        if(!premium) return message.channel.send(`**You need to be premium to use this command!**`);

        if(!args[0]) return message.channel.send(`**Please specify a playlist!**`);

        const Plist = args.join(" ").replace(/_/g, ' ');
        const playlist = await Playlist.findOne({ name: Plist });
        if(!playlist) return message.channel.send(`**Playlist \`${Plist}\` not found!**`);
        if(playlist.owner !== message.author.id) return message.channel.send(`**This is not your playlist!**`);

        await playlist.delete();

        const embed = new MessageEmbed()
            .setDescription(`**Deleted • \`${Plist}\`**`)
            .setColor('#000001')

        message.channel.send({ embeds: [embed] });
    }
}