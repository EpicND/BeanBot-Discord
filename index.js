const config = require('config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Nice name nerd, ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('ok nerd');
  }
});

client.login('NzEzODgxMjg1MTA5NzQzNzE3.XsmlAQ._Xbju_KD4SXlSwm08ZH5cGlTcJw');
