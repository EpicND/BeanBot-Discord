
module.exports = {
    name: 'invite',
    description: 'Invite the bot to your server',
    execute(msg, args) {
      msg.reply("Use this link to add our bot to your server! \n https://discord.com/api/oauth2/authorize?client_id=713881285109743717&permissions=67584&scope=bot");
    }
  }
