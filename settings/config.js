require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN || "YOUR_TOKEN",  // your bot token
    PREFIX: process.env.PREFIX || "#", //<= default is #  // bot prefix

    OWNER_ID: process.env.OWNER_ID || "YOUR_CLIENT_ID", //your client id

    NP_REALTIME: process.env.NP_REALTIME || "BOOLEAN", // "true" = realtime, "false" = not realtime :3 // WARNING: on set to "true" = laggy

    DEV_ID: [], // if you want to use command bot only, you can put your id here // example: ["515490955801919488", "543595284345782296"]

    MONGO_URI: process.env.MONGO_URI || "YOUR_MONGO_URI", // your mongo uri
    LIMIT_TRACK: process.env.LIMIT_TRACK || "100",  //<= dafault is "100" // limit track in playlist
    LIMIT_PLAYLIST: process.env.LIMIT_PLAYLIST || "10", //<= default is "10" // limit can create playlist

    NODES: [
      { 
        host: process.env.NODE_HOST || "localhost",
        port: parseInt(process.env.NODE_PORT || "5555"),
        password: process.env.NODE_PASSWORD || "123456",
      } 
    ],
}