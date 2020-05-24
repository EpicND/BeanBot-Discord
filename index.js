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
  case 'help':
      msg.reply('maybe next year');
      msg.channel.send("").then(lol => {
        lol.edit("check out our discord: www.discord.com. \n b!help: get a list of commands \n b!ping: a command for nerds \n b!fact: get a (not so) fun fact about :b:eans \n b!img: get a photo of beans \n b!exp: check ur server's bean level")
        { disableEveryone: true }
    })
    break;
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
  case 'fact':
      var x = Math.floor(Math.random() * 11);
      switch(x){
        case 0: msg.reply('Shut up nerd no :b:ean facts for your broke ass');
          break;
        case 1: msg.reply('Beans are the large seeds of certain types of plants, and are technically a fruit.');
          break;
        case 2: msg.reply('January 6th is National :b:ean Day. It also falls on the day in which geneticist, Gregor Mendel (:goat:), who famously used :b:ean and pea plants to test his theories on inheritance died in 1884.');
          break;
        case 3: msg.reply(':b:eans have been cultivated by humans for 6,000 years.');
          break;
        case 4: msg.reply('In Nicaragua, newlyweds are given a bowl of :b:eans for good luck.');
          break;
        case 5: msg.reply('In ancient Greece, minor public officials were elected by putting one white :b:ean with a load of black :b:eans inside a “:b:ean machine.” Whoever picked the white :b:ean got the job.');
          break;
        case 6: msg.reply('An archaeologist in the 1980’s working in New Mexico came upon a clay pot sealed with pine tar containing :b:ean seeds that were 1,500 years old…and they grew!');
          break;
        case 7: msg.reply(':b:eans can be made into burgers, cakes, drinks, pies, fudge, muffins, jewelry, furniture (:b:ean-bag chairs!), toys, and musical instruments.');
          break;
        case 8: msg.reply('In the 6th century BC, philosopher and mathematician Pythagoras (certified dumbass) had a deep philosophical dislike of :b:eans. Some historians reported his aversion was due to the belief that legumes contained the souls of the dead');
          break;
        case 9: msg.reply('Approximately 71,089 people in the world have the last name :b:ean.');
          break;
        case 10: msg.reply('Vermont ranks highest in searching for :b:ean recipes online. Montana and Wyoming are second and third.');
          break;
        case 11: msg.reply('The longest recorded time for sitting in a bath of cold baked :b:eans is 100 hours by Barry “Captain :b:eany” Kirk');
          break;
      }
      break;
    default:


}



});


client.login(config.token);
