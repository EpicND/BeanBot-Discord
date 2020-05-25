
module.exports = {
    name: 'transfer',
    description: 'Buy something',
    execute(msg, args, guildSize) {

const currentAmount = currency.getBalance(msg.author.id);
const transferAmount = commandArgs.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
const transferTarget = msg.mentions.users.first();

if (!transferAmount || isNaN(transferAmount)) return msg.channel.send(`Sorry ${msg.author}, that's an invalid amount.`);
if (transferAmount > currentAmount) return msg.channel.send(`Sorry ${msg.author}, you only have ${currentAmount}.`);
if (transferAmount <= 0) return msg.channel.send(`Please enter an amount greater than zero, ${msg.author}.`);

currency.add(msg.author.id, -transferAmount);
currency.add(transferTarget.id, transferAmount);

return msg.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(msg.author.id)}💰`);
}
}
