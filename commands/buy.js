// const Discord = require('discord.js');

// module.exports = {
//     name: 'buy',
//     description: 'Buy something',
//     async execute(msg, args, guildSize) {
// const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
// if (!item) return msg.channel.send(`That item doesn't exist.`);
// if (item.cost > currency.getBalance(msg.author.id)) {
// 	return msg.channel.send(`You currently have ${currency.getBalance(msg.author.id)}, but the ${item.name} costs ${item.cost}!`);
// }

// const user = await Users.findOne({ where: { user_id: msg.author.id } });
// currency.add(msg.author.id, -item.cost);
// await user.addItem(item);

// msg.channel.send(`You've bought: ${item.name}.`);
//       }
// }
