require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN || "YOUR_TOKEN",  // your bot token
    PREFIX: process.env.PREFIX || "#", //<= default is #  // bot prefix
    OWNER_ID: process.env.OWNER_ID || "YOUR_CLIENT_ID", //your client id
    CLIENT_ID: process.env.CLIENT_ID || "YOUR_BOT_CLIENT_ID", // you bot client id
    GUILD_ID: process.env.GUILD_ID || "YOUR_GUILD_ID", // your guild id want to use slashcommand
    NP_REALTIME: process.env.NP_REALTIME || "BOOLEAN", // "true" = realtime, "false" = not realtime :3 // WARNING: on set to "true" = laggy
    NODES: [
      { 
        host: process.env.NODE_HOST || "localhost",
        port: parseInt(process.env.NODE_PORT || "5555"),
        password: process.env.NODE_PASSWORD || "123456",
      } 
    ],
}