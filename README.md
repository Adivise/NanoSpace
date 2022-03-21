## 📄 READ THIS

**NEED USE WITH SLASH-COMMAND? HERE: >> [NanoSpacePlus](https://github.com/Adivise/NanoSpacePlus)**

## 📑 Short Feature
- [x] Music System
- [x] Playlists System
- [x] Premium System
- [x] Custom Prefix
- [x] Multi Language
- [x] Custom Filters
- [x] Easy to use

## 🎶 Support Source
- [x] Youtube
- [x] SoundCloud
- [x] Spotify
- [x] Deezer
- [x] Facebook 
- [x] Twitch
- [x] Apple
- [x] Bandcamp
- [x] Vimeo
- [x] Https (Radio)

## 🚨 Have a Problem

✈ Join Discord:  [NanoSpace ♪♪](https://discord.gg/SNG3dh3MbR)
   mention me in chat #general or #javascript and ask problem okay! 👌

<details><summary>📎 Requirements [CLICK ME]</summary>
<p>

## 📎 Requirements

1. Node.js Version 16.6.0+ **[Download](https://nodejs.org/en/download/)**
2. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
3. LavaLink **[Guide](https://github.com/freyacodes/lavalink)** (i use this development version [Download](https://ci.fredboat.com/repository/downloadAll/Lavalink_Build/9311:id/artifacts.zip) )
4. MongoDB **[Download](https://www.mongodb.com/try/download/community)** (Download & install = Finish!)

## 🛑 Super Requirements 

Java 11-13 **[Download JDK13](http://www.mediafire.com/file/m6gk7aoq96db8g0/file)** (i use this version) for LAVALINK!

</p>
</details>

## 📚 Installation

```
git clone https://github.com/Adivise/NanoSpace
cd NanoSpace
npm install
```

<details><summary>📄 Configuration [CLICK ME]</summary>
<p>

## 📄 Configuration

> **OPTION 1️⃣**

Copy or Rename `.env.example` to `.env` and fill out the values:

```.env
# Bot
TOKEN=REPLACE_HERE
PREFIX=#
NP_REALTIME=true
LEAVE_TIMEOUT=120000
LANGUAGE=en
EMBED_COLOR=#000001

# Devloper
OWNER_ID=REPLACE_HERE

# Database
MONGO_URI=mongodb://127.0.0.1:27017/nanospace
LIMIT_TRACK=100
LIMIT_PLAYLIST=10

# Lavalink
NODE_HOST=localhost
NODE_PORT=5555
NODE_PASSWORD=123456
```

> **OPTION 2️⃣**

Go to folder `settings` edit `config.js` and you can fill out the values:

```js
require("dotenv").config();
const { resolve } = require("path");

module.exports = {
    TOKEN: process.env.TOKEN || "YOUR_TOKEN",  // your bot token
    PREFIX: process.env.PREFIX || "#", //<= default is #  // bot prefix
    EMBED_COLOR: process.env.EMBED_COLOR || "#000001", //<= default is "#000001"

    OWNER_ID: process.env.OWNER_ID || "YOUR_CLIENT_ID", //your owner discord id example: "515490955801919488"

    NP_REALTIME: process.env.NP_REALTIME || "BOOLEAN", // "true" = realtime, "false" = not realtime :3 // WARNING: on set to "true" = laggy and bot will ratelimit if you have a lot of servers
    LEAVE_TIMEOUT: parseInt(process.env.LEAVE_TIMEOUT || "120000"), // leave timeout default "120000" = 2 minutes // 1000 = 1 seconds

    LANGUAGE: {
      defaultLocale: process.env.LANGUAGE || "en", // "en" = default language
      directory: resolve("languages"), // <= location of language
    },

    DEV_ID: [], // if you want to use command bot only, you can put your id here example: ["123456789", "123456789"]

    MONGO_URI: process.env.MONGO_URI || "YOUR_MONGO_URI", // your mongo uri
    LIMIT_TRACK: parseInt(process.env.LIMIT_TRACK || "100"),  //<= dafault is "100" // limit track in playlist
    LIMIT_PLAYLIST: parseInt(process.env.LIMIT_PLAYLIST || "10"), //<= default is "10" // limit can create playlist

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

</p>
</details>

<details><summary>🔩 Features & Commands [CLICK ME]</summary>
<p>

## 🔩 Features & Commands

> Note: The default prefix is '#'

🎶 **Music Commands!** 

- Play (#play, #p, #pplay [song/url])
- Nowplaying (#nowplaying, #np, #now)
- Queue (#queue <page>)
- Repeat (#loop (current, all), #repeat (current, all))
- Loopqueue (#loopall, #lq, repeatall)
- Shuffle (#shuffle, mix)
- Volume control (#vol, #v [10 - 100])
- Pause (#pause, #pa)
- Resume (#resume, #r)
- Skip (#skip, #s)
- Skipto (#skipto, #st [position])
- Clear (#clear)
- Join (#join, #summon)
- Leave (#leave, #dc, #lev, #stop)
- Forward (#forward <second>)
- Seek (#seek <second>)
- Rewind (#rewind <second>)
- Replay (#replay)
- Search (#search [songname])
- 247 (#247)
- Previous (#previous)
- Autoplay (#autoplay)

⏺ **Filter Commands!**
- Bass (#bass)
- Superbass (#superbass, #sb)
- Pop (#pop)
- Treblebass (#treblebass, #tb)
- Soft (#soft)
- Earrape (#earrape, #ear)
- Equalizer (#eq <custom>)
- Speed (#speed <amount>)
- Picth (#pitch <amount>)
- Vaporwave (#vaporwave)
- Nightcore (#nightcore)
- Bassboost (#bassboost, #bb [-10 - 10])
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
- Daycore (#daycore)
- Television (#Television)
- Jazz (#jazz)
	
📦 **Playlist Commands!**
- Create (#create [name])
- Add (#add [name] [link])
- Private (#private [name])
- Public (#public [name])
- Delete (#delete [name])
- Import (#import [name])
- Detail (#detail [name])
- Remove (#remove [name] [position])
- Savequeu (#savequeue [name])
- View (#view)
	
💎 **Premium Commands!**
- Premium (#premium [plan] [user id])
- Generate (#generate [plan] [amount])
- Redeem (#redeem [code])
	
📑 **Utilities Commands!**
- Restart (#restart, #stopbot)
- DeploySlash (#deploy, #dps) <= only one guild
- ClearSlash (#cdps) <= work only deployslash
- Prefix (#prefix [new prefix])
- Language (#language [lang]) // Example: en, hi
- DeploySlashGlobal (#deployglobal, #dpsg) <= want change need wait 1 - 2 hrs.
- Help (#help, #halp [command])

</p>
</details>


<details><summary>🖼 Picture [CLICK ME]</summary>
<p>

## 🖼 Picture & ScreenShots

![see](https://i.imgur.com/xUurYDJ.png)
![see](https://i.imgur.com/hxSCmeP.png)
![see](https://i.imgur.com/P3GNCbQ.png)
![see](https://i.imgur.com/9Plhzar.png)
![see](https://i.imgur.com/k2Sp8zo.png)

</p>
</details>

<details><summary>👏 Credits [CLICK ME]</summary>
<p>

## 👏 THANK
- [lavamusic](https://github.com/brblacky/lavamusic)
- [EarTensifier](https://github.com/Tetracyl/EarTensifier)

</p>
</details>
