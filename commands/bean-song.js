const Discord = require('discord.js');
const fs = require('fs');

const beanSongArray = [
    "https://wi.to/9782c5bec6afe5e8~s",
]

module.exports = {
    name: 'beansong',
    description: "plays the beanos anthem...",
    async execute(msg, args, client){
        if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join();
            const dispatcher = connection.play(fs.createReadStream("./media/baked_bean_song.mp3"));

dispatcher.on('start', () => {
	console.log('audio.mp3 is now playing!');
});

dispatcher.on('finish', () => {
	console.log('audio.mp3 has finished playing!');
});
// connection.disconnect();

// Always remember to handle errors appropriately!
dispatcher.on('error', console.error);
        }
    }
}