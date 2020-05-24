const Discord = require('discord.js');

module.exports = {
    name: 'info',
    description: 'Gets the info for the bot',
    execute(msg, args, guildSize) {
      const infoEmbed = new Discord.MessageEmbed()
      .setColor(0x4F7942)
      .setAuthor("Info", "https://cdn.discordapp.com/icons/713946467877912636/433d42fd310800ee68d63bf1e5c006fd.png?size=2048")
      // .setDescription("**'help** - Displays this message.\n**'ping** - :ping_pong: Pong! (Used to show response time)\n**'invite** - Used to invite me to your server\n**'announce** - Used by admins to address the people of the guild\n**'clear <number of messages to delete (up to 100)>** - Deletes `x` number of messages\n**'rule** - Add a rule to a channel that includes `rules`\n**'info**-Learn more about me and my owner/programmer\n**'ban** - Bans a member, type ban to learn syntax of this command\n**'kick** - Kicks a member from the guild, type 'kick for command syntax\n**'vcmute** - mutes a given member\n**'vcunmute** - unmutes a given member\n**'deafen** - Deafens a given member\n**'undeafen** - undeafens a given member\n**'warn** - Warns a member that is mentioned (Requires the MANAGE_GUILD Permission)\n**'userinfo** - Used to find the info of a certain user, usage: <'userinfo> for info about yourself <'userinfo @user> for info about certain user\n**'google** - Search google for something\n**'hastebin** - Used to hastebin to share your code!\n**'flip** - Flips a two sided coin\n**'roll** - Rolls a 6 sided dice")
      .addField("**Bot Info**", ':b:ean bot is a funny meme bot made to fulfill your widest bean needs. Use b!help to get started. I can send bean images, bean facts, bean memes, and many other things. I am **1** day old. Many more features are coming for all of you bean addicts!'  )
      .addField("**Developer Info**", 'This bot is made by **ccans#5709** and **DhairyaG23#7326**. We are always looking to add more features, facts, and photos. Join my server to reccomend things!')
      .addField("**Beta**", 'BeatBot is constantly being updated!. Currently, we are working on making specific categories of beans and expanding our photo library of beans and bean memes. join our server and leave recommendations for what we should add next!')
      // .catch(console.error);
      msg.channel.send({embed: infoEmbed})
      msg.channel.send("**Check out our server** \n https://discord.gg/ptksuF")
    }
  }
