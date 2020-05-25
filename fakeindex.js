const config = require('./config');
const Discord = require('discord.js');

const client = new Discord.Client();
const { Users, CurrencyShop } = require('./dbObjects');
const { Op } = require('sequelize');
const currency = new Discord.Collection();
const PREFIX = 'b!';

const insultArray = [
 "The only thing you have in common with a bean is your IQ. spell it properly nerd",
 "I feel bad for your english teacher if you can't even spell the commands correctly",
 "?? :clown:",
 'Choose an actual command bimbo'
];

const factArray = [':b:eans are the large seeds of certain types of plants, and are technically a fruit.',
'January 6th is National :b:ean Day. It also falls on the day in which geneticist, Gregor Mendel (:goat:), who famously used :b:ean and pea plants to test his theories on inheritance died in 1884.',
':b:eans have been cultivated by humans for 6,000 years.',
'In Nicaragua, newlyweds are given a bowl of :b:eans for good luck.',
'In ancient Greece, minor public officials were elected by putting one white :b:ean with a load of black :b:eans inside a “:b:ean machine.” Whoever picked the white :b:ean got the job.',
'An archaeologist in the 1980’s working in New Mexico came upon a clay pot sealed with pine tar containing :b:ean seeds that were 1,500 years old…and they grew!',
':b:eans can be made into burgers, cakes, drinks, pies, fudge, muffins, jewelry, furniture (:b:ean-bag chairs!), toys, and musical instruments.',
'In the 6th century BC, philosopher and mathematician Pythagoras (certified dumbass because he hated beans) had a deep philosophical dislike of :b:eans. Some historians reported his aversion was due to the belief that legumes contained the souls of the dead',
'Approximately 71,089 people in the world have the last name :b:ean.',
'Vermont ranks highest in searching for :b:ean recipes online. Montana and Wyoming are second and third.',
'The longest recorded time for sitting in a bath of cold baked :b:eans is 100 hours by Barry “Captain :b:eany” Kirk',
"Beans are very good source of fibers, protein, vitamins, complex carbohydrates, folate, and iron but some of them, like red and white kidney beans, also have toxins while they are raw.",
];

var imgArr = [
  'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/320192_2200-800x1200.jpg',
  'https://www.gracefullittlehoneybee.com/wp-content/uploads/2014/09/Slow-Cooker-Pinto-Beans-3.jpg',
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fnusciencesolutions.com%2Frecipe%2Fno-gas-home-cooked-beans%2F&psig=AOvVaw3l2RY4CvFUl7d2ToWzqOND&ust=1590432909641000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiR4raWzekCFQAAAAAdAAAAABAQ',
  'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/320/320192/lots-of-beans-in-a-large-spoon.jpg?w=1155&h=1297',
  'https://img.sndimg.com/food/image/upload/c_thumb,q_80,w_412,h_232/v1/img/recipes/27/78/6/picB92GVL.jpg',
  'https://i.ytimg.com/vi/xilvJ4zWytI/maxresdefault.jpg',
  'https://www.momontimeout.com/wp-content/uploads/2020/01/crockpot-baked-beans-in-metal-serving-dish-title-.jpg',
  'https://www.belovedshirts.com/wp-content/uploads/2019/04/sweatsshirt-front-1.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSP14hWBsCFiTCdjUXZDzSJ41JAowyVhCYiMpkpQgjfVhLwdcMF&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGqYig3gWTlXINog8BDM2f8jUin0qK_x2n9Nku4wy5jESKVBq4&usqp=CAU'
];

/*
 * Make sure you are on at least version 5 of Sequelize! Version 4 as used in this guide will pose a security threat.
 * You can read more about this issue On the [Sequelize issue tracker](https://github.com/sequelize/sequelize/issues/7310).
 */

Reflect.defineProperty(currency, 'add', {
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

client.once('ready', async () => {
	const storedBalances = await Users.findAll();
	storedBalances.forEach(b => currency.set(b.user_id, b));
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {

	currency.add(message.author.id, 1);

	if (!message.content.startsWith(PREFIX) || message.author.bot) return;


	const args = message.content.slice(PREFIX.length).split(/ +/);
	for(x=0; args[x] == '' || args[x] == ' ';){
			args.shift();
			// console.log('epic' + args[x])
	}

	if (!message.content.startsWith(PREFIX)) return;
	const input = message.content.slice(PREFIX.length).trim();
	if (!input.length) return;
	const [, commandq, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

const command = args.shift().toLowerCase();

	if (command === 'balance') {
		const target = message.mentions.users.first() || message.author;
		return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);
	} else if (command === 'inventory') {
		const target = message.mentions.users.first() || message.author;
		const user = await Users.findOne({ where: { user_id: target.id } });
		const items = await user.getItems();

		if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
		return message.channel.send(`${target.tag} currently has ${items.map(t => `${t.amount} ${t.item.name}`).join(', ')}`);
	} else if (command === 'transfer') {
		const currentAmount = currency.getBalance(message.author.id);
		const transferAmount = commandArgs.split(/ +/).find(arg => !/<@!?\d+>/.test(arg));
		const transferTarget = message.mentions.users.first();

		if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount`);
		if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author} you don't have that much.`);
		if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}`);

		currency.add(message.author.id, -transferAmount);
		currency.add(transferTarget.id, transferAmount);

		return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}💰`);
	} else if (command === 'buy') {
		const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
		if (!item) return message.channel.send('That item doesn\'t exist.');
		if (item.cost > currency.getBalance(message.author.id)) {
			return message.channel.send(`You don't have enough currency, ${message.author}`);
		}

		const user = await Users.findOne({ where: { user_id: message.author.id } });
		currency.add(message.author.id, -item.cost);
		await user.addItem(item);

		message.channel.send(`You've bought a ${item.name}`);
	} else if (command === 'shop') {
		const items = await CurrencyShop.findAll();
		return message.channel.send(items.map(i => `${i.name}: ${i.cost}💰`).join('\n'), { code: true });
	} else if (command === 'leaderboard') {
		return message.channel.send(
			currency.sort((a, b) => b.balance - a.balance)
				.filter(user => client.users.has(user.user_id))
				.first(10)
				.map((user, position) => `(${position + 1}) ${(client.users.get(user.user_id).tag)}: ${user.balance}💰`)
				.join('\n'),
			{ code: true }
		);
	} else if(command === 'fact') {
			var s = Math.floor(Math.random()*10);
			if(s > 0){
			var x = Math.floor(Math.random() * 12);
			message.channel.send(factArray[x])
			} else {
					message.channel.send("Shut up nerd no :b:ean facts for your broke ass")
			}
		} else if(command === 'help') {
			const helpEmbed = new Discord.MessageEmbed()
			.setColor(0x4F7942)
			.setAuthor("Commands", "https://cdn.discordapp.com/icons/713946467877912636/433d42fd310800ee68d63bf1e5c006fd.png?size=2048")
			// .setDescription("**'help** - Displays this message.\n**'ping** - :ping_pong: Pong! (Used to show response time)\n**'invite** - Used to invite me to your server\n**'announce** - Used by admins to address the people of the guild\n**'clear <number of messages to delete (up to 100)>** - Deletes `x` number of messages\n**'rule** - Add a rule to a channel that includes `rules`\n**'info**-Learn more about me and my owner/programmer\n**'ban** - Bans a member, type ban to learn syntax of this command\n**'kick** - Kicks a member from the guild, type 'kick for command syntax\n**'vcmute** - mutes a given member\n**'vcunmute** - unmutes a given member\n**'deafen** - Deafens a given member\n**'undeafen** - undeafens a given member\n**'warn** - Warns a member that is mentioned (Requires the MANAGE_GUILD Permission)\n**'userinfo** - Used to find the info of a certain user, usage: <'userinfo> for info about yourself <'userinfo @user> for info about certain user\n**'google** - Search google for something\n**'hastebin** - Used to hastebin to share your code!\n**'flip** - Flips a two sided coin\n**'roll** - Rolls a 6 sided dice")
			.addField("**Basic Commands**", '**b!help** - `gives all bot commands` \n **b!ping** - `stats for nerds` \n **b!info** - `everything you need to know about the bot`')
			.addField("**:b:ean Commands**", '**b!fact** - `random facts about beans` \n **b!img** - `sends a random bean image` \n **b!beansong** - `listen to the beanos theme song`')
			.addField("**Misc. Commands**", '**b!exp** - `check how many beanpts your server has` \n **b!invite** - `get the link to invite the bot to your server`')

			message.react('👍')
			.catch(console.error);
			message.channel.send({embed: helpEmbed})
			message.channel.send("**Check out our server** \n https://discord.gg/dUeN76Y")
		} else if(command === "img") {
			var s = Math.floor(Math.random()*10);
			if(s > 0){
			var x = Math.floor(Math.random() * 10);
			message.channel.send("Here you go: " + imgArr[x])
			} else {
					message.channel.send("Why are you addicted to :b:ean photos")
			}
		} else if(command === "info") {
			const infoEmbed = new Discord.MessageEmbed()
      .setColor(0x4F7942)
      .setAuthor("Info", "https://cdn.discordapp.com/icons/713946467877912636/433d42fd310800ee68d63bf1e5c006fd.png?size=2048")
      // .setDescription("**'help** - Displays this message.\n**'ping** - :ping_pong: Pong! (Used to show response time)\n**'invite** - Used to invite me to your server\n**'announce** - Used by admins to address the people of the guild\n**'clear <number of messages to delete (up to 100)>** - Deletes `x` number of messages\n**'rule** - Add a rule to a channel that includes `rules`\n**'info**-Learn more about me and my owner/programmer\n**'ban** - Bans a member, type ban to learn syntax of this command\n**'kick** - Kicks a member from the guild, type 'kick for command syntax\n**'vcmute** - mutes a given member\n**'vcunmute** - unmutes a given member\n**'deafen** - Deafens a given member\n**'undeafen** - undeafens a given member\n**'warn** - Warns a member that is mentioned (Requires the MANAGE_GUILD Permission)\n**'userinfo** - Used to find the info of a certain user, usage: <'userinfo> for info about yourself <'userinfo @user> for info about certain user\n**'google** - Search google for something\n**'hastebin** - Used to hastebin to share your code!\n**'flip** - Flips a two sided coin\n**'roll** - Rolls a 6 sided dice")
      .addField("**Bot Info**", ':b:ean bot is a funny meme bot made to fulfill your widest bean needs. **Use b!help to get started**. I can send bean images, bean facts, bean memes, and many other things. I am **1** day old. Many more features are coming for all of you bean addicts!'  )
      .addField("**Developer Info**", 'This bot is made by **ccans#5709** and **DhairyaG23#7326**. We are always looking to add more features, facts, and photos. Join my server to recommend things!')
      .addField("**Beta**", 'BeatBot is constantly being updated!. Currently, we are working on making specific categories of beans and expanding our photo library of beans and bean memes. join our server and leave recommendations for what we should add next!')
      // .catch(console.error);
      message.channel.send({embed: infoEmbed})
      message.channel.send("**Check out our server** \n https://discord.gg/dUeN76Y")
		} else if(command === "invite") {
			message.channel.send("Use this link to add me to your server! \n https://discord.com/api/oauth2/authorize?client_id=713881285109743717&permissions=8&scope=bot");
		} else if(command === "ping") {
			message.reply('ok nerd');
			var time1 = message.createdTimestamp
			message.channel.send("Pinging...").then(lol => {
				var time2 = lol.createdTimestamp
				lol.edit(":ping_pong: **Pong!** **Response Time:** `" +(time2-time1)+" `Miliseconds")
				{ disableEveryone: true }
				console.log(time2-time1+" miliseconds response time")
		})
	} else {
			var x = Math.floor(Math.random()*3)
      message.reply(insultArray[x]);
	}
});


var configToken;

if(process.env.BOT_TOKEN){configToken = process.env.BOT_TOKEN.toString() }else {configToken = config.token};
client.login(configtoken);
