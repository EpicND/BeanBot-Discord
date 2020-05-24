const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();


const PREFIX = 'b!';

client.on('ready', () => {
  console.log(`Nice name nerd, ${client.user.tag}!`);
});


client.on('message', msg => {
//   if (msg.content === 'ping') {
 
//   }

//   if (msg.content === 'b!fact') {
//     msg.reply('Shut up nerd no bean facts for your broke ass');
//   }

let args = msg.content.substring(PREFIX.length).split(' ');
switch(args[0]){
    case 'ping':
        msg.reply('ok nerd');

        var time1 = msg.createdTimestamp
        msg.channel.send("Pinging...").then(lol => {
          var time2 = lol.createdTimestamp
          lol.edit(":ping_pong: **Pong!** **Response Time:** `" +(time2-time1)+" `Miliseconds")
          { disableEveryone: true }
          console.log(time2-time1+" miliseconds response time")
      })
    break;
    case 'fact' || 'facts':
        msg.reply('Shut up nerd no bean facts for your broke ass');
    break;

}



});


client.login(config.token);
