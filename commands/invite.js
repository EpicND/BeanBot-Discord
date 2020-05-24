
module.exports = {
    name: 'invite',
    description: 'Invite the bot to your server',
    execute(msg, args) {
      msg.channel.send("Use this link to add me bot to your server! \n https://discord.com/api/oauth2/authorize?client_id=713881285109743717&permissions=8&scope=bot");
    }
  }
