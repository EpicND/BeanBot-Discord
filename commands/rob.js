const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const firebaseAdmin = require('firebase-admin')
const serviceAcc = require('../firebase.json');

var app = firebaseAdmin;
const database = app.database();
var db = firebaseAdmin.database();



module.exports = {
    name: 'rob',
    description: 'rob a nerd',
    execute(msg, args, guildSize, UID) {
      // console.log(args);
      // var ref = db.ref("/Users/" + UID + "/Money");
      // console.log("/Users/" + UID + "/Money");
      // ref.once("value", function(snapshot) {
      // console.log("The value is " + snapshot.val());
      // if(snapshot.val() == null) {
      //   var ref = db.ref("/Users");
      //   ref.update({
      //     [UID] : {
      //       "Inventory" : {
      //         "Nothing" : "am broke"
      //       },
      //       "Money" : 10
      //     },
      //   });
      //   msg.reply("Account created: You have " + snapshot.val() + " beans");
      // } else {
      //   msg.reply("You have " + snapshot.val() + " beans");
      // }
      //
      // }, function (errorObject) {
      // console.log("The read failed: " + errorObject.code);
      // });
    }
}
