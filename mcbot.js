const Discord = require("discord.js")
const mcping = require('mc-ping-updated')
const chalk = require('chalk')
const escape = require('markdown-escape')
const client = new Discord.Client()
const settings = require('./config.json');
var hasIcon = 'n/a'

pingFrequency = (settings.pingInterval * 1000)

function getDate() {
    date = new Date();
    cleanDate = date.toLocaleTimeString();
}

function getServerStatus() {
    mcping(settings.ip, settings.port, function(err, res) {
        if (!(typeof err === 'undefined' || err === null)) {
            client.user.setStatus('dnd');
            serverStatus = 'Server offline';
            client.user.setActivity(serverStatus, { type: 'PLAYING' });
            getDate()
            console.log((chalk.yellow('\[' + cleanDate + '\]:') + chalk.white(' Ping: ' +
                'Error getting server status')));
            console.error(err);
            return;
        }
        if (typeof res.players.sample === 'undefined') { client.user.setStatus('idle') }
        if (!(typeof res.players.sample === 'undefined')) { client.user.setStatus('online') }
        serverStatus = res.players.online + ' / ' + res.players.max;
        getDate()
        client.user.setActivity(serverStatus, { type: 'PLAYING' }).then(presence => console.log(
            chalk.cyan('\[' + cleanDate + '\]:') + chalk.white(' Ping: ' + serverStatus)
        )).catch(console.error);
    })
}

//Startup:
client.on("ready", () => {
    console.log("Ready!");
    getServerStatus()
    client.setInterval(getServerStatus, pingFrequency);
});

//Command Handling
client.on('message', message => {
    if (!message.content.startsWith(settings.commandPrefix)) return;
    if (message.author.bot) return; {
        const args = message.content.slice(settings.commandPrefix.length).trim().split(
            / +/g);
        const command = args.shift().toLowerCase();
        //log the above
        console.log('Command \'' + message.content + '\' issued by ' + message.member.user.tag);
        console.log('Args: ' + args);
        //Help command handling
        if (command === "help" || command === "commands" || command === "list" | command ===
            "bot") {
            console.log('Issuing help message.');
            message.channel.send({
                embed: {
                    color: 3447003,
                    title: 'Commands:',
                    description: '**/status** - The current status and player count of your server \n**/crash** - Restart the bot'
                }
            });
            return;
        }
        //Status command handling
        else if (command === "status" || command === "server" || command === "online") {
            mcping(settings.ip, settings.port, function(err, res) {
                if (err) {
                    console.log(err);
                    message.channel.send('Error getting server status.');
                    return;
                } else {
                    try {
                        favicon = res.favicon.slice(22)
                        hasIcon = 'yes'
                    } catch (error) {
                        hasIcon = 'no'
                    }
                    let onlinePlayers = [];
                    if (typeof res.players.sample == 'undefined') {
                        serverStatus = '*No one is playing!*';
                    } else {
                        for (var i = 0; i < res.players.sample.length; i++) {
                            onlinePlayers.push(res.players.sample[i].name);
                        };
                        onlinePlayers = onlinePlayers.sort();
                        onlinePlayers = onlinePlayers.join(', ');
                        onlinePlayers = escape(onlinePlayers);
                        serverStatus = '**' + res.players.online + '/' + res.players.max +
                            '**' + ' player(s) online.\n' + onlinePlayers;
                        console.log('  ' + serverStatus);
                    };
                    if (hasIcon === 'yes') {
                        const buffer = Buffer.from(favicon, 'base64')
                        const serverEmbedicon = new Discord.RichEmbed().attachFile({ attachment: buffer,
                            name: 'icon.png' }).setTitle('Status for ' +
                            settings.ip + ':').setColor(3447003).setDescription(
                            serverStatus).setThumbnail('attachment://icon.png').addField(
                            "Server version:", res.version.name)
                        message.channel.send(serverEmbedicon);
                    } else if (hasIcon === 'no') {
                        const serverEmbedNoIcon = new Discord.RichEmbed().setTitle(
                                'Status for ' + settings.ip + ':').setColor(3447003)
                            .setDescription(serverStatus).addField("Server version:",
                                res.version.name)
                        message.channel.send(serverEmbedNoIcon);
                    }
                }
            }, 3000);
            return;
        } else if (command === "crash") { process.exit(0); } else return;
    }
})
client.login(settings.token);