const search = require('youtube-search');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const firebaseAdmin = require('firebase-admin')
const serviceAcc = require('../firebase.json');

var app = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAcc),
    databaseURL: "https://bean-bot-278206.firebaseio.com"
  });

  const database = app.database();

module.exports = {
    name: "play",
    description: "plays music",
async execute(msg, args, client) {
        console.log(msg.guild.id)

        const errorEmbed = new Discord.MessageEmbed()
        .setAuthor('❌ Error')
        .addField("Error", "You must be in a voice channel to play music")
        .setColor( "#c70000")

        const voiceChannel = msg.member.voice.channel;
        if (voiceChannel) {
            voiceChannel.join()
                .then(connection => {

                    try {

                        var searchTerm = `${args[0]}`;
                        for (x = 0; x < (args.length - 1); x++) {
                            searchTerm += ` ${args[x+1]}`
                        }
                        var link;

                        var opts = {
                            maxResults: 1,
                            key: process.env.YOUTUBE_SEARCH_KEY,
                            type: 'video',
                        };


                        search(searchTerm, opts, async function (err, results) {
                            if (err) return console.log(err);
                            console.log(results[0].link)
                            link = results[0].link;
                            console.log(link)
                            // console.dir(results);
                            // console.log(link);
                            const stream = ytdl(link, {
                                filter: "audioonly"
                            });
                            const dispatcher = connection.play(stream);
                            database.ref(`queues/${msg.guild.id}`).update({
                                playing: true,
                            });
                            msg.channel.send(`Now Playing: ${link}`)
                            dispatcher.on('finish', () => connection.disconnect());
                        });


                    } catch (err) {
                        console.log(err)
                    }

                })
        } else {
            msg.channel.send({
                embed: errorEmbed
            })
        }
    }
}