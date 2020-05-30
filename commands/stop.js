const Discord = require('discord.js');
const firebaseAdmin = require('firebase-admin')
const serviceAcc = require('../firebaseConfig.json');

var app = firebaseAdmin.app();

const database = app.database();

module.exports = {
    name: "stop",
    description:"stops music playback",
    async execute(msg, args, client){
        const connection = await client.voice.channel;
        console.log(`connection: ${connection}`)

            msg.member.voice.channel.leave();
            database.ref(`queues/${msg.guild.id}`).update({
                playing: false,
                queue: ["empty"],
            });

    }

}