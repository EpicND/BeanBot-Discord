const search = require('youtube-search');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');

module.exports = {
    name: "play",
    description: "plays music",
    async execute(msg, args, client){
        const voiceChannel = msg.member.voice.channel;
        voiceChannel.join()
        .then(connection => {
    
    try{

    var searchTerm = `${args[0]}`;
    for(x=0; x<(args.length -1); x++){
        searchTerm += ` ${args[x+1]}`
    }
    var link;
 
    var opts = {
    maxResults: 1,
    key: process.env.YOUTUBE_SEARCH_KEY,
    type: 'video',
    };
 
    search(searchTerm, opts, function(err, results) {
    if(err) return console.log(err);
        link = results[0].link
    // console.dir(results);
    });

    console.log(link);
    const stream = ytdl(link, {filter: "audioonly", quality: "247"});
    const dispatcher = connection.play(stream);
    dispatcher.on('end', () => voiceChannel.leave);
    } catch(err) {
    console.log(err)
    }
    
    }
        )}
}