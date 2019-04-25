const Discord = require("discord.js")
const mcping = require('mc-ping-updated')
const chalk = require('chalk')
const escape = require('markdown-escape')
const client = new Discord.Client()
const settings = require('./config.json'); //Location of config file

var hasIcon = 'n/a'

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
  console.log("Ready!");
  newUpdate() //Ping the server once on startup, setting bot status
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

mcping(settings.ip, settings.port, function(err, res){
    if (err) {
        // Some kind of error
        console.log(err);
        message.channel.send('Error getting server status.'); return;
    } else {
        //console.log(res);
        //console.log(res.description.extra);
        //console.log(res.favicon)

       
        try {favicon = res.favicon.slice(22)

              
              console.log('Successfully retrieved icon')
              hasIcon = 'yes'
        }

        catch(error){
          console.log('Error retrieving icon')
          hasIcon = 'no'
        }
        

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

console.log('Attempting to send embed:')
console.log(hasIcon)

if (hasIcon === 'yes'){
const buffer = Buffer.from(favicon, 'base64')
const serverEmbedicon = new Discord.RichEmbed()
    .attachFile({attachment:buffer, name: 'icon.png'})
    .setTitle('Status for ' + settings.ip + ':')
    .setColor(3447003)
    .setDescription(status2)
    .setThumbnail('attachment://icon.png')
    .addField("Server version:", res.version.name)
    message.channel.send(serverEmbedicon);
}

else if(hasIcon === 'no'){
  const serverEmbedNoIcon = new Discord.RichEmbed()
    .setTitle('Status for ' + settings.ip + ':')
    .setColor(3447003)
    .setDescription(status2)
    .addField("Server version:", res.version.name)
    message.channel.send(serverEmbedNoIcon);
}





    
    }
}, 3000);
return;
        }

    
      else if (command === "crash"){process.exit(0);}
      else return;
}})

client.login(settings.token);
