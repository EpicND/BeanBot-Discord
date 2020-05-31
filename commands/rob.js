const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const firebaseAdmin = require('firebase-admin')
const serviceAcc = require('../firebaseConfig.json');

//initialize firebase
var app = firebaseAdmin;
const database = app.database();
var db = firebaseAdmin.database();





module.exports = {
  name: 'rob',
  description: 'rob a nerd',

    execute(msg, args, guildSize, UID) {
      console.log(args);
      msg.channel.send('Processing...').then(processingMessage =>
        {
          var ref = db.ref("/Users/" + UID + "/Money");
      console.log("/Users/" + UID + "/Money");
      ref.once("value", function(snapshot) {
      
      console.log("The value is " + snapshot.val());
      if(snapshot.val() == null) {

        var ref = db.ref("/Users");
        ref.update({
          [UID] : {
            "Inventory" : {
              "Nothing" : "am broke"
            },
            "Money" : 10
          },
        });
      processingMessage.edit("Account created: You have " + snapshot.val() + " beans");
      } else {
        processingMessage.edit("You have " + snapshot.val() + " beans");
      }

      }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      });
        }
      )
      
    }
}
