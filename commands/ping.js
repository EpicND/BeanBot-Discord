module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(msg, args) {
        msg.reply('ok nerd');
        var time1 = msg.createdTimestamp
        msg.channel.send("Pinging...").then(lol => {
          var time2 = lol.createdTimestamp
          lol.edit(":ping_pong: **Pong!** **Response Time:** `" +(time2-time1)+" `Miliseconds")
          { disableEveryone: true }
          console.log(time2-time1+" miliseconds response time")
      })
	},
}