
module.exports = {
    name: 'shop',
    description: 'Check out the shop'',
    execute(msg, args, guildSize) {
const items = await CurrencyShop.findAll();
return msg.channel.send(items.map(item => `${item.name}: ${item.cost}💰`).join('\n'), { code: true });
}
}
