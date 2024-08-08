const bdd = require("../stockage/bdd.json")
const fs = require("fs");
const config = require('../../config.json') 




module.exports = (client, message_Welcome) =>{ 
    
   client.on("message", message => {

    if(message.content.startsWith( config.PREFIX + "mb")){
        message.delete();
            if(message.member.hasPermission('MANAGE_MESSAGES')){
                if(message.content.length > 5) {
                    message_Welcome = message.content.slice(4)
                    bdd['message-Welcome'] = message_Welcome
                    console.log(message_Welcome)
                    Savebdd();
                }
            }

   
}

});



function Savebdd() {
    fs.writeFile("./fonction/stockage/bdd.json", JSON.stringify(bdd, null, 4), (err) =>{
        if (err) message.channel.send("An error occurred while backing up.");
    });
   
}

Savebdd();





}
