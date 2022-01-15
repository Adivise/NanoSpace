module.exports = async (client, message) => { 
    if(message.author.bot || message.channel.type === "dm") return;

    const PREFIX = client.prefix;

    let args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(PREFIX)) return;
    let commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
    if(commandfile) commandfile.run(client, message, args)
}