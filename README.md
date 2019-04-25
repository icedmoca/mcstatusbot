# mcstatusbot
A simple [Discord.js](https://www.npmjs.com/package/discord.js) bot that pings [Minecraft](https://minecraft.gamepedia.com) servers using the [mc-ping-updated](https://www.npmjs.com/package/mc-ping-updated) node module.

# Setup & Configuration
Get the bot running:
- Follow a Discord.js bot quickstart guide ([An Idiot's Guide](https://anidiots.guide/getting-started/getting-started-long-version), [DevDungeon](https://www.devdungeon.com/content/javascript-discord-bot-tutorial), etc.) up to the step where you have a functioning bot and bot user, then replace your `mybot.js` file with `mcbot.js` (or just copy and paste the code from the latter into the former)
- Install any Node dependencies you're missing ([mc-ping-updated](https://www.npmjs.com/package/mc-ping-updated), [chalk](https://www.npmjs.com/package/chalk), [markdown-escape](https://www.npmjs.com/package/markdown-escape)) by opening the command line, navigating to the bot's directory, and running `npm install [name]` for each package you need to install.

Edit the `config.json` file to provide your bot token, preferred command prefix, Minecraft server IP address & port, and ping interval:
- Replace `"YOUR BOT TOKEN HERE"` with your bot token. *Keep it secret. Keep it safe.*
- Replace `"/"` with your preferred command prefix or leave it as-is to use `/`
- Replace `"YOUR SERVER IP HERE"` with the IP address of the Minecraft server you want to poll. Domains that redirect to IP addresses ("play.exampleserver.net") will also work.
- Replace `"25565"` with the port number of the Minecraft server you want to poll, or leave it as-is for port 25565.
- Replace `"30000"` with the frequency, in milliseconds, at which you want the bot to ping the server. Defaults to polling every 30,000 milliseconds, or 30 seconds.
- Start the bot by running `start.sh` (Linux) or `start.bat` (Windows). The bot should connect and begin polling the server.

- (Optional/Linux-only) Start a new screen with `screen -S statusbot` and then, in that screen, issue the command `./start.sh`to kick off the start script. You can now detach from the screen with `ctrl-a + ctrl-d` and the script will keep running in the background, restarting the bot every time it stops.
- The `statusbot` screen will then act as your bot's console, reporting the commands it gets issued and the server status via `console.log()`. To stop the bot, re-attach the `statusbot` screen using the command `screen -X statusbot` and then hitting `ctrl-c` to interrupt `start.sh`.

# Default Commands
- `/help` (aliases: `/commands`, `/list`, `/bot`) - List the other commands
- `/status` (aliases: `/server`) - Manually poll the Minecraft server whose IP address and port are listed in `config.json`, returning the server's version and a list of any online players
- `/crash` - Stop the bot. If you're using a looping `start.sh` script like the one provided, this effectively restarts the bot.
