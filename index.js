const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Nice name nerd, ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('ok nerd');

    var time1 = msg.createdTimestamp
    msg.channel.send("Pinging...").then(lol => {
      var time2 = lol.createdTimestamp
      lol.edit(":ping_pong: **Pong!** **Response Time:** `" +(time2-time1)+" `Miliseconds")
      { disableEveryone: true }
console.log(time2-time1+" miliseconds response time")
  })
  }

});

client.login(config.token);
