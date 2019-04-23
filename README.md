# mcstatusbot
A simple Discord.js bot that pings Minecraft servers using the [mc-ping-updated](https://www.npmjs.com/package/mc-ping-updated) node module.

# Setup & Configuration
Get the bot running:
- Follow a Discord.js bot quickstart guide ([An Idiot's Guide](https://anidiots.guide/getting-started/getting-started-long-version), [DevDungeon](https://www.devdungeon.com/content/javascript-discord-bot-tutorial), etc.) up to the step where you have a functioning bot and bot user, then replace your `mybot.js` file with `mcbot.js` (or just copy and paste the code from the latter into the former)
- Install any Node dependencies you're missing ([mc-ping-updated](https://www.npmjs.com/package/mc-ping-updated), [chalk](https://www.npmjs.com/package/chalk), [markdown-escape](https://www.npmjs.com/package/markdown-escape))

Edit the `config.json` file to provide your bot token, preferred command prefix, Minecraft server IP address, and Minecraft server port:
- Replace `"YOUR BOT TOKEN HERE"` with your bot token. *Keep it secret. Keep it safe.*
- Replace `"/"` with your preferred command prefix or leave it alone to use `/`
- Replace `"YOUR SERVER IP HERE"` with the IP address of the Minecraft server you want to poll. Domains that redirect to IP addresses ("play.exampleserver.net") will also work.
- Replace `"YOUR SERVER PORT HERE"` with the port number of the Minecraft server you want to poll.

The bot should begin polling the Minecraft server the next time it starts.
- (Optional/Linux-only) Start a new screen with `screen -S statusbot` and then, in that screen, issue the command `./start.sh`to kick off the start script. You can now detach from the screen with `ctrl-a + ctrl-d` and the script will keep running in the background, restarting the bot every time it stops.
- The `statusbot` screen will then act as your bot's console, reporting the commands it gets issued and the server status via `console.log()`. To stop the bot, re-attach the `statusbot` screen using the command `screen -X statusbot` and then hitting `ctrl-c` to interrupt `start.sh`.

# Default Commands
- `/help` (aliases: `/commands`, `/list`, `/bot`) - List the other commands
- `/status` - Manually poll the Minecraft server whose IP address and port are listed in `config.json`, returning the server's version and a list of any online players
- `/crash` - Stop the bot. If you're using a looping `start.sh` script like the one provided, this effectively restarts the bot.
