const search = require('youtube-search');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const firebaseAdmin = require('firebase-admin')
const serviceAcc = require('../firebase.json');

// var app = firebaseAdmin.initializeApp({
//     credential: firebaseAdmin.credential.cert(serviceAcc),
//     databaseURL: "https://bean-bot-278206.firebaseio.com"
//   });

var queue = new Array;

const database = firebaseAdmin.app().database();

module.exports = {
    name: "play",
    description: "plays music",
    async execute(msg, args, client) {

        var opts = {
            maxResults: 1,
            key: process.env.YOUTUBE_SEARCH_KEY,
            type: 'video',
        };




        const errorEmbed = new Discord.MessageEmbed()
            .setAuthor('❌ Error')
            .addField("Error", "You must be in a voice channel to play music")
            .setColor("#c70000");
        const errorAlreadyPlaying = new Discord.MessageEmbed()
            .setAuthor('❌ Error')
            .addField("Error", "The bot is already playing music")
            .setColor("#c70000");


        async function main(){

        }

        async function ytSearch(searchTerm) {
            search(searchTerm, opts, async function (err, results) {
                if (err) return console.log(err);
                console.log(results[0])
                link = results[0].link;
                console.log(link)
                // console.dir(results);
                // console.log(link);
               
            });

        }


//https://www.googleapis.com/youtube/v3/search?q=fall%20out%20boy&part=snippet&maxResults=10&key=AIzaSyCVLrX4xcxuVB2dawrZDIqjZ-ZCfu1szIk&type=video

        function ytSearchAndAddToQueue(searchTerm){
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
                    queue: queue,
                });
                msg.channel.send(`Now Playing: ${link}`)
                dispatcher.on('finish', () => {
                    connection.disconnect();
                    database.ref(`queues/${msg.guild.id}`).update({
                        playing: false,
                        queue: ['empty'],
                    });

                });
            });

        }

        function playSong(link, title, author, requestedBy) {
            const stream = ytdl(link, {
                filter: "audioonly"
            });
            const dispatcher = connection.play(stream);
            database.ref(`queues/${msg.guild.id}`).update({
                playing: true,
                queue: queue,
            });
            msg.channel.send(`Now Playing: ${link}`)
            dispatcher.on('finish', () => {
                connection.disconnect();
                database.ref(`queues/${msg.guild.id}`).update({
                    playing: false,
                    queue: ['empty'],
                });

            });

        }

        function addToQueue() {

        }

        function checkQueue() {

        }
        var ref = database.ref(`queues/${msg.guild.id}`);



        await getQueue();
        console.log(queue)
        var isPlaying;


        ref.on("value", function (snapshot) {
            snapshotObj = snapshot.val();
            // queue = snapshotObj.queue;
            for (x = 0; x < snapshotObj.queue.length; x++) {
                queue.push(snapshotObj.queue)
            }
            isPlaying = snapshotObj.playing;
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

        console.log(msg.guild.id)


        var searchTerm = `${args[0]}`;
        for (x = 0; x < (args.length - 1); x++) {
            searchTerm += ` ${args[x+1]}`
        }

        const voiceChannel = msg.member.voice.channel;
        if (voiceChannel) {
            if (!isPlaying) {
                voiceChannel.join()
                    .then(connection => {

                        try {


                            var link;







                        } catch (err) {
                            console.log(err)
                        }

                    })
            } else {
                // msg.channel.send({embed: errorAlreadyPlaying})
                if (queue[0] = "empty") {
                    queue = [];
                    queue.push(searchTerm);
                    database.ref(`queues/${msg.guild.id}`).update({
                        playing: true,
                        queue: queue,
                    });
                } else {
                    queue.push(searchTerm);
                    database.ref(`queues/${msg.guild.id}`).update({
                        playing: true,
                        queue: queue,
                    });
                }
                msg.channel.send(`Queue: ${queue}`)
            }
        } else {
            msg.channel.send({
                embed: errorEmbed
            })
        }
        async function getQueue() {
            ref.once("value", function (data) {
                // queue = [];
                // do some stuff once
                // return data.val().queue;
                if (data.val().queue == undefined || data.val().queue == null) {
                    database.ref(`queues/${msg.guild.id}`).update({
                        playing: true,
                        queue: ['empty'],
                    });
                }
                for (z = 0; z < data.val().queue.length; z++) {
                    queue.push(data.val().queue[z])
                }

            });
        }
    }



}