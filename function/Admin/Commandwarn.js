const bdd = require("../stockage/bdd.json")
const fs = require("fs");
const config = require('../../config.json') 


module.exports = (client) =>{ 
    
    client.on("message", message => {

    if(message.content.startsWith( config.PREFIX + "warn")){

    message.delete();

        if(message.member.hasPermission('BAN_MEMBERS')){

            if(!message.mentions.users.first()) 
                return;
            
                user = message.mentions.users.first().id

            if(bdd["warn"][user] == 5){
                
                delete bdd["warn"][user]

                message.guild.members.ban(user)

                message.channel.send("You've been banned.");

                Savebdd();

            }
            else{
                if(!bdd["warn"][user]){
                   
                    bdd["warn"][user] = 1
                    
                    Savebdd();
                    
                    message.channel.send("You now have " + bdd["warn"][user] + " Warnings");
                    
                }
                else{
                    bdd["warn"][user]++
                   
                    Savebdd();

                    message.channel.send("You now have " + bdd["warn"][user] + " Warnings");
                }
            }

    }

  
    }
});


function Savebdd() {
    fs.writeFile("./function/stockage/bdd.json", JSON.stringify(bdd, null, 4), (err) =>{
        if (err) message.channel.send("An error occurred while backing up.");
    });
   
}

Savebdd();




}