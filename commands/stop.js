const Discord = require('discord.js');

module.exports = {
    name: "stop",
    description:"stops music playback",
    async execute(msg, args, client){
        const connection = await client.voice.channel;
        console.log(`connection: ${connection}`)

            voiceChannel.leave();

    }

}