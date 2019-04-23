# mcstatusbot
A simple Discord.js bot for pinging Minecraft servers using the [mc-ping-updated](https://www.npmjs.com/package/mc-ping-updated) Node module.

# Setup & Configuration
- Follow a Discord.js bot quickstart guide ([An Idiot's Guide](https://anidiots.guide/getting-started/getting-started-long-version), [DevDungeon](https://www.devdungeon.com/content/javascript-discord-bot-tutorial), etc.) up to the step where you have a functioning bot and bot user.
- Replace your `mybot.js` file with `mcbot.js` (or just copy and paste the code from the latter into the former)

Edit the `config.json` file to provide your bot token, preferred command prefix, Minecraft server IP address, and Minecraft server port:
- Replace `"YOUR BOT TOKEN HERE"` with your bot token. *Keep it secret. Keep it safe.*
- Replace `"/"` with your preferred command prefix or leave it alone to use `/`
- Replace `"YOUR SERVER IP HERE"` with the IP address of the Minecraft server you want to poll. Domains that redirect to IP addresses ("play.exampleserver.net") will also work.
- Replace `"YOUR SERVER PORT HERE"` with the port number of the Minecraft server you want to poll.

Run the `/crash` command to stop the bot, or stop and start it again manually. The bot should begin polling the Minecraft server the next time it starts.
