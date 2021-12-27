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
- [x] Spotify
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

1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. CustomLavalink **[Lavalink](https://github.com/MeLike2D/lavalink)**
- PT. Use my application.yml [PasteBin](https://pastebin.com/FwekJDuX) Fixed the issue of songs not matching the ones specified. 
3. SpotifyID & SpotifySecret **[Dashboard](https://developer.spotify.com/dashboard/applications)**

## 🛑 Super Requirements 

1. Java 11-13 **[Download JDK13](http://www.mediafire.com/file/m6gk7aoq96db8g0/file)** (i use this here version)
2. Invite **[Access Invite](https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=8&scope=bot%20applications.commands)** (replace CLIENT_ID to your bot client id!)

## 📚 Installation

```
git clone https://github.com/Adivise/NanoSpace
cd NanoSpace
npm install
```

## 🤖 Register SlashCommand

Invite **[Access Invite](https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=8&scope=bot%20applications.commands)** (replace CLIENT_ID to your bot client id!)

1. type `node registerSlash` to register in one guild!
2. type `node registerSlashGlobal` to register all guild! (but to need wait 1 - 2 hrs. or you can't wait pls kick bot and invite new!)

After installation finishes you can use `node .` to start the bot. or `Run Start.bat`

## 📄 Configuration

Copy or Rename `config.json.example` to `config.json` and fill out the values:

```json
{
	"PREFIX": "#",
	"TOKEN": "TOKEN_HERE",
	"OWNER_ID": "YOUR_CLIENT_ID",
	"SpotifyID": "CLIENT_ID",
	"SpotifySecret": "CLIENT_SECRET",
	"CLIENT_ID": "YOUR_BOT_ID",
	"GUILD_ID": "YOUR_GUILD_ID",
	"nodes": [
		{ "host": "localhost", "port": 5555, "password": "123456" }
	]
}
```

## 🔩 Features & Commands

> Note: The default prefix is '#'

🎶 **Music Commands!** 

- Play (#play, #p, #pplay) can play song from youtube, soundcloud and twitch
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
- [Some Handler](https://github.com/brblacky/lavamusic)

- [Queue Page](https://github.com/Tetracyl/EarTensifier)
