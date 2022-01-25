## 📸 Tutorial

- [x] How to run on Replit? [Click Here](https://youtu.be/PvWHuYA8kpU)
- [x] How to run on your own? [Coming Next...]

## ☔ Fork

 [![Run on Repl.it](https://repl.it/badge/github/Adivise/NanoSpace)](https://repl.it/github/Adivise/NanoSpace) (add more soon!)

## 📑 Short Feature
- [x] Music
- [x] Playlists Sysytem
- [x] Custom Prefix
- [x] SlashCommand
- [x] Custom Filters
- [x] Easy to use

## 🎶 Support Source
- [x] Youtube
- [x] SoundCloud
- [x] Spotify
- [x] Deezer
- [x] Twitch
- [x] Apple
- [x] Bandcamp
- [x] Vimeo
- [x] Https (Radio)

## 🚨 Have a Problem

✈ Join Discord:  [NanoSpace ♪♪](https://discord.gg/SNG3dh3MbR)
   mention me in chat #general or #javascript and ask problem okay! 👌


## 📎 Requirements

1. Node.js Version 16+ **[Download](https://nodejs.org/en/download/)**
2. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
3. Lavalink **[Guide](https://github.com/freyacodes/lavalink)** (i use this development version [Direct Download](https://ci.fredboat.com/repository/downloadAll/Lavalink_Build/9311:id/artifacts.zip) )

## 🛑 Super Requirements 

1. Java 11-13 **[Download JDK13](http://www.mediafire.com/file/m6gk7aoq96db8g0/file)** (i use this here version)
2. Invite **[Access Invite](https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=8&scope=bot%20applications.commands)** (replace CLIENT_ID to your bot client id!) for slashcommand!

## 📚 Installation

```
git clone https://github.com/Adivise/NanoSpace
cd NanoSpace
npm install
```

## 🤖 Register SlashCommand

Invite **[Access Invite](https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=8&scope=bot%20applications.commands)** (replace CLIENT_ID to your bot client id!) for slashcommand!

1. type `node registerSlash` to register in one guild!
2. type `node registerSlashGlobal` to register all guild! (but to need wait 1 - 2 hrs. or you can't wait pls kick bot and invite new!)

## 📄 Configuration

> **OPTION 1️⃣**

Copy or Rename `.env.example` to `.env` and fill out the values:

```.env
# Bot
TOKEN=REPLACE_HERE
PREFIX=#
CLIENT_ID=REPLACE_HERE
GUILD_ID=REPLACE_HERE
NP_REALTIME=true

# Devloper
OWNER_ID=REPLACE_HERE

# Database
MONGO_URI=mongodb://127.0.0.1:27017/playlist
LITMIT_TRACK=100
LITMIT_PLAYLIST=10

# Lavalink
NODE_HOST=localhost
NODE_PORT=5555
NODE_PASSWORD=123456
```

> **OPTION 2️⃣**

Go to folder `settings` edit `config.js` and you can fill out the values:

```js
require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN || "YOUR_TOKEN",  // your bot token
    PREFIX: process.env.PREFIX || "#", //<= default is #  // bot prefix

    OWNER_ID: process.env.OWNER_ID || "YOUR_CLIENT_ID", //your client id

    CLIENT_ID: process.env.CLIENT_ID || "YOUR_BOT_CLIENT_ID", // you bot client id
    GUILD_ID: process.env.GUILD_ID || "YOUR_GUILD_ID", // your guild id want to use slashcommand

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
```

After installation or finishes all you can use `node .` to start the bot. or `Run Start.bat`

<details><summary>AllCommands (CLICK ME)</summary>
<p>

## 🔩 Features & Commands

> Note: The default prefix is '#'

🎶 **Music Commands!** 

- Play (#play, #p, #pplay)
- Nowplaying (#nowplaying, #np, #now)
- Queue (#q)
- Repeat (#loop (current, all), #repeat (current, all))
- Loopqueue (#loopall, #lq, repeatall)
- Shuffle (#shuffle, mix)
- Volume control (#vol, #v)
- Pause (#pause, #pa)
- Resume (#resume, #r)
- Skip (#skip, #s)
- Skipto (#skipto, #st)
- Clear (#clear)
- Join (#join, #summon)
- Leave (#leave, #dc, #lev, #stop)
- Forward (#forward)
- Seek (#seek)
- Rewind (#rewind)
- Replay (#replay)
- Search (#search)
- 247 (#247)
- Previous (#previous)

⏺ **Filter Commands!**
- Bass (#bass)
- Superbass (#superbass, #sb)
- Pop (#pop)
- Treblebass (#treblebass, #tb)
- Soft (#soft)
- Earrape (#earrape, #ear)
- Equalizer (#eq <custom>)
- Speed (#speed )
- Picth (#pitch)
- Vaporwave (#vaporwave)
- Nightcore (#nightcore)
- Bassboost (#bassboost <number -10 - 10>, #bb <number -10 - 10>)
- Rate (#rate)
- Reset (#reset)
- 3d (#3d)
- China (#china)
- Dance (#dance)
- Chipmunk (#chipmunk)
- Darthvader (#darthvader)
- DoubleTime (#doubletime)
- SlowMotion (#slowmotion)
- Tremolo (#tremolo)
- Vibrate (#vibrate)
- Vibrato (#vibrato)
	
💌 **Playlist Commands!**
- Create (#create <link> <name>) <= Work all link? use same name to add! went your have!
- Delete (#delete <name>)
- Import (#import <name>)
- Show (#show)
- Show (#showall)
	
📑 **Utilities Commands!**
- Restart (#restart, #stopbot)
- Premium (#premium <mention>)
- Help (#help, #halp)

</p>
</details>

<details><summary>Picture (CLICK ME)</summary>
<p>

## 🖼 Picture & ScreenShots

- [CLICK ME!](https://imgur.com/a/qzgEhTd)

![see](https://i.imgur.com/wvSDhJ0.png)
![see](https://i.imgur.com/XjVuX8K.png)
![see](https://i.imgur.com/ThSvWPx.png)
![see](https://i.imgur.com/jncxeNu.png)
![see](https://i.imgur.com/7mDFd30.png)
![see](https://i.imgur.com/jL1IMeW.png)
![see](https://i.imgur.com/5461gRn.png)
![see](https://i.imgur.com/42PavqR.png)

</p>
</details>

<details><summary>New Picture (CLICK ME)</summary>
<p>

## 🖼 Picture & ScreenShots

![see](https://i.imgur.com/xUurYDJ.png)
![see](https://i.imgur.com/hxSCmeP.png)
![see](https://i.imgur.com/P3GNCbQ.png)
![see](https://i.imgur.com/9Plhzar.png)
![see](https://i.imgur.com/k2Sp8zo.png)

</p>
</details>

## 👏 THANK
- [lavamusic](https://github.com/brblacky/lavamusic)
- [EarTensifier](https://github.com/Tetracyl/EarTensifier) (made me to create this bot!)
