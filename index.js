const fs = require('fs');
const config = require('./config.json');
const Discord = require('discord.js');
var firebaseAdmin = require('firebase-admin');
const client = new Discord.Client();
client.commands = new Discord.Collection();


const ytdl = require('ytdl-core');
const serviceAcc = require('./firebaseConfig.json');

var app = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAcc),
    databaseURL: "https://bean-bot-278206.firebaseio.com"
  });
const database = app.database();
var db = firebaseAdmin.database();

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
  // console.log(command);
  var x = Math.floor(Math.random()*4);

  if (!client.commands.has(command)) return msg.reply(insultArray[x]);

	try {
		client.commands.get(command).execute(msg, args, client, msg.author.id);
		giveBeans(msg.author.id);
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
var money;
function giveBeans(UID) {
	var ref = db.ref("/Users/" + UID + "/Money");
	ref.once("value", function(snapshot) {
	money = snapshot.val();
	if(snapshot.val() == null) {

		var ref = db.ref("/Users");
		ref.update({
			[UID] : {
				"Inventory" : {
					"Nothing" : "am broke"
				},
				"Money" : 10
			},
		});
		// msg.reply("Account created: You have " + snapshot.val() + " beans");
	} else {
		giveBeans2(UID);
	}

	}, function (errorObject) {
	console.log("The read failed: " + errorObject.code);
	});
}

function giveBeans2(UID) {
	var ref2 = db.ref("/Users/");
	var hopperRef = ref2.child(UID);
	hopperRef.update({
			"Money" : money + 2
	});
}


var configToken;

if(process.env.BOT_TOKEN){configToken = process.env.BOT_TOKEN.toString() }else {configToken = config.token};
console.log(configToken)
client.login(configToken);
