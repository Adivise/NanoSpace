module.exports = {
    TOKEN: [ /// You can add token bot (unlimited) if you want!
      "TOKEN_BOT_01", 
      "TOKEN_BOT_02", 
      "TOKEN_BOT_03",
      "TOKEN_BOT_04",
      "TOKEN_BOT_05",
      "TOKEN_BOT_06",
      "TOKEN_BOT_07",
      "TOKEN_BOT_08",
      "TOKEN_BOT_09",
      "TOKEN_BOT_10"
    ],
    PREFIX: [ /// Prefix bot need same count with token
      "01.", 
      "02.", 
      "03.",
      "04.",
      "05.",
      "06.",
      "07.",
      "08.",
      "09.",
      "10."
    ],
    EMBED_COLOR: "#000001", //<= default is "#000001"
    OWNER_ID: "YOUR_CLIENT_ID", //your owner discord id example: "515490955801919488"
    DEV_ID: [], // if you want to use bot only as you, you can put your id here example: ["123456789", "123456789"]
    NODES: [ /// Requirement 1 Nodes for this project!
      {
        host: "localhost",
        port: 5555,
        password: "123456",
      }
    ],
}