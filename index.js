const fs = require('fs');
const config = require('./config.json');
const Discord = require('discord.js');
var firebaseAdmin = require('firebase-admin');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const prefix = 'b!';

// setup('neevius', 0);

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
  "Choose an actual command bimbo"
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
  // console.log(client.guilds.size)

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;


    const args = msg.content.slice(prefix.length).split(/ +/);
    for(x=0; args[x] == '' || args[x] == ' ';){
        args.shift();
        // console.log('epic' + args[x])
    }

	const command = args.shift().toLowerCase();
  var x = Math.floor(Math.random()*4);

  if (!client.commands.has(command)) return msg.reply(insultArray[x]);

	try {
		client.commands.get(command).execute(msg, args, client);
		// setup(msg.author.id, 0);
	} catch (error) {
		console.error(error);
		msg.channel.send('there was an error trying to execute that command!');
    }

});

function defaultCase(msg){
    var x = Math.floor(Math.random()*4)
      msg.reply(insultArray[x]);

}

var x;
var student;

function setup(id, amount) {
	var setup = false;
	const fs = require('fs');
	const fileName = './data.json';
	const file = require(fileName);

	fs.readFile('./data.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
			const customer = JSON.parse(jsonString)
			if(customer["neevius"] != undefined || customer["neevius"] == 0) {
				console.log("acc exists");
				console.log(customer["neevius"]);
				x = customer.neevius.money;
				setup = false;
			} else {
				console.log("acc no exists");
				setup = true;
			}

} catch(err) {
        console.log('Error parsing JSON string:', err)
    }
})



	if(setup) {

		let newUser = {
				[id]: {
		    money: amount,
			}
		};

			let data = JSON.stringify(newUser, null, 2);
			fs.writeFileSync(fileName, data);
			msg.channel.send('Your bank account has successfully been set up');
		} else {

				file.obj[id].money = x+1;
				fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
			  if (err) return console.log(err);
			  console.log(JSON.stringify(file));
			  console.log('writing to ' + fileName);
			});
			msg.channel.send('You now have ' + currentAmount+1 + ' coins');
		}
}

var configToken;

if(process.env.BOT_TOKEN){configToken = process.env.BOT_TOKEN.toString() }else {configToken = config.token};
console.log(configToken)
client.login(configToken);

// var myJson = {
//  "nerds": [
//
//  ]
//
// }
