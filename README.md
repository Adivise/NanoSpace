## 📸 Tutorial

- [x] How to run on Replit? [Click Here](https://youtu.be/PvWHuYA8kpU)
- [x] How to run on your own? [Coming Next...]

## ☔ Fork

 [![Run on Repl.it](https://repl.it/badge/github/Adivise/NanoSpace)](https://repl.it/github/Adivise/NanoSpace) (add more soon!)

## 📑 Short Feature
- [x] Music
- [x] Custom Prefix
- [x] SlashCommand
- [x] Custom Filters
- [x] No Database Requirement
- [x] Easy to use

## 🎶 Support Source
- [x] Youtube
- [x] SoundCloud
- [x] Spotify (no api key anymore!)
- [x] Deezer
- [x] Twitch
- [x] Facebook
- [x] Apple
- [x] Bandcamp
- [x] Vimeo
- [x] Mixer
- [x] Https (Radio)

## 🚨 Have a Problem

✈ Join Discord:  [NanoSpace ♪♪](https://discord.gg/SNG3dh3MbR)
   mention me in chat #general or #javascript and ask problem okay! 👌


## 📎 Requirements

1. Node.js Version 16+ **[Download](https://nodejs.org/en/download/)**
2. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
3. Lavalink **[Guide](https://github.com/freyacodes/lavalink)** (switch back to default lavalink!)
- PT. Use my application.yml [PasteBin](https://pastebin.com/FwekJDuX) Fixed the issue of songs not matching the ones specified. 

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
TOKEN=replace_your_bot_token
PREFIX=#
OWNER_ID=replace_your_client_id
CLIENT_ID=replace_your_bot_client_id
GUILD_ID=replace_your_guild_want_to_register_slashcommand

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
	
📑 **Utilities Commands!**
- restart (#restart, #stopbot)
- help (#help, #halp)

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

- **New Picture**

![see](https://i.imgur.com/xUurYDJ.png)
![see](https://i.imgur.com/hxSCmeP.png)
![see](https://i.imgur.com/P3GNCbQ.png)
![see](https://i.imgur.com/9Plhzar.png)
![see](https://i.imgur.com/k2Sp8zo.png)


## 👏 THANK
- [Some Events](https://github.com/brblacky/lavamusic)

- [Queue Page](https://github.com/Tetracyl/EarTensifier)
	
- [Some Filters](https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js)
