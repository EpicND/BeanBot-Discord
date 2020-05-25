const fs = require('fs');
const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const prefix = 'b!';

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

 const insultArray = [
  "The only thing you have in common with a bean is your IQ. spell it properly nerd",
  "I feel bad for your english teacher if you can't even spell the commands correctly",
  "?? :clown:",
  'Choose an actual command bimbo'
 ];

client.on('ready', () => {
  console.log(`Nice name nerd, ${client.user.tag}! Use b!help to get started`);
	client.user.setPresence({
        status: "online",  //You can show online, idle....
        game: {
            name: `b!help | ${client.guilds.size} servers, ${client.users.size} servers`,  //The message shown
            type: "PLAYING" //PLAYING: WATCHING: LISTENING: STREAMING:
        }
    });
	client.user.setActivity(`b!help | ${client.guilds.size} servers, ${client.users.size} members`, {type: "PLAYING"});


});


client.on('message', msg => {
  console.log(client.guilds.size)

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;


    const args = msg.content.slice(prefix.length).split(/ +/);
    for(x=0; args[x] == '' || args[x] == ' ';){
        args.shift();
        // console.log('epic' + args[x])
    }

	const command = args.shift().toLowerCase();
  var x = Math.floor(Math.random()*3);

  if (!client.commands.has(command)) return msg.reply(insultArray[x]);

	try {
		client.commands.get(command).execute(msg, args, client.guilds.size);
	} catch (error) {
		console.error(error);
		msg.channel.send('there was an error trying to execute that command!');
    }

});

function defaultCase(msg){
    var x = Math.floor(Math.random()*3)
      msg.reply(insultArray[x]);

}

var configToken;

if(process.env.BOT_TOKEN){configToken = process.env.BOT_TOKEN.toString() }else {configToken = config.token};
console.log(configToken)
client.login(configToken);
