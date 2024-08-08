const bdd = require("../stockage/bdd.json")
const fs = require("fs");

module.exports = (client) =>{


client.on("guildCreate", guild => {
    bdd[guild.id] = {}
    Savebdd();
});


function Savebdd() {
    fs.writeFile("./function/stockage/bdd.json", JSON.stringify(bdd, null, 4), (err) =>{
        if (err) message.channel.send("An error occurred while backing up.");
    });
   
}

}