const Discord = require("discord.js"); //Require Discord.js -- a module that allows us to interact with Discord
mcping = require('mc-ping-updated'); //Require mc-ping-updated -- a module that allows us to ping a Minecraft server
const chalk = require('chalk'); //Require chalk -- a module that allows us to style console logs with color
var escape = require('markdown-escape') // Require markdown-escape -- a module that allows us to escape markdown formatting (preventing things like tildes in playernames from showing up in Discord as strikethroughs)
const client = new Discord.Client();
const settings = require('./config.json'); //Location of config file

function newUpdate () {
mcping(settings.ip, settings.port, function(err, res) {
  if (!(typeof err === 'undefined' || err === null)) {
        client.user.setStatus('dnd');
        status2 = 'Server offline';
        client.user.setActivity(status2, { type: 'PLAYING' });
      date = new Date();
cleanDate = date.toLocaleTimeString();
      console.log((chalk.yellow('\[' + cleanDate + '\]:') + chalk.white(' Ping: ' + 'Error getting server status')));
        console.error(err); return;}
    else {
        if (typeof res.players.sample == 'undefined')
            {status2 = res.players.online + ' / ' + res.players.max;
        client.user.setStatus('idle')
    date = new Date();
cleanDate = date.toLocaleTimeString();
client.user.setActivity(status2, { type: 'PLAYING' })
      .then(presence => console.log(chalk.cyan('\[' + cleanDate + '\]:') + chalk.white(' Ping: ' + status2)))
      .catch(console.error); return;}
        else {
         status2 = res.players.online + ' / ' + res.players.max
client.user.setStatus('online');
date = new Date();
cleanDate = date.toLocaleTimeString();
client.user.setActivity(status2, { type: 'PLAYING' })
      .then(presence => console.log(chalk.cyan('\[' + cleanDate + '\]:') + chalk.white(' Ping: ' + status2)))
      .catch(console.error);
}}});
}

//On startup:
client.on("ready", () => {
  console.log("I am ready!");
  newUpdate() //ping the server once on startup, setting bot status
  client.setInterval(newUpdate,settings.pingInterval);
});



//Command Handling
client.on('message', message => {

    if (!message.content.startsWith(settings.commandPrefix)) return; //If the message doesn't start with our prefix, ignore it
    if (message.author.bot) return;{ //If the author of the message is a bot (including us)-- ignore it

const args = message.content.slice(settings.commandPrefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

//log the above
console.log('Command \'' + message.content + '\' issued by ' + message.member.user.tag);
console.log('Args: ' + args);


//Help command handling
if (command === "help" || command === "commands" || command === "list" | command === "bot"){

      console.log('Issuing help message.');
         message.channel.send({embed: {
          color: 3447003,
          title: 'Commands:',
          description: '**/status** - The current status and playercount of your server \n**/crash** - Restart the bot'
                            }}); return;

       }

     
//Status command handling
        else if (command === "status" || command === "server"){

mcping('cataclysm.us', 25565, function(err, res) {
    if (err) {
        // Some kind of error
        console.error(err);
        message.channel.send('Error getting server status.'); return
    } else {
      
        let onlinePlayers = [];


if (typeof res.players.sample == 'undefined'){
    status2 = '*No one is playing!*';
} else {

          for (var i = 0; i < res.players.sample.length; i++) {
  
  onlinePlayers.push(res.players.sample[i].name);
};


onlinePlayers = onlinePlayers.sort();
onlinePlayers = onlinePlayers.join(', ');
onlinePlayers = escape(onlinePlayers);
         status2 = '**' + res.players.online + '/' + res.players.max + '**' + ' player(s) online.\n' + onlinePlayers;

console.log('  ' + status2);
        
  };

        message.channel.send({embed: {
                                title: 'Status:',
                                color: 3447003,
                                description: status2,
                                fields: [
                                  {
                                    name: "Server Version:",
                                    value: (res.version.name)
                                  },
                                ],
                              
                              }
                            }); 
    }
}, 3000);
return;
        }

    
      else if (command === "crash"){process.exit(0);}
      else return;
}})

client.login(settings.token);
