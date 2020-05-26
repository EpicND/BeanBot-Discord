// module.exports = {
//     name: 'inventory',
//     description: 'Check inventory',
//     async  execute(msg, args, guildSize) {
//       const target = msg.mentions.users.first() || msg.author;
//       const user = await Users.findOne({ where: { user_id: target.id } });
//       const items = await user.getItems();

//       if (!items.length) return msg.channel.send(`${target.tag} has nothing!`);
//       return msg.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
//     }
// }
