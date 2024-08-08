const fs = require("fs");

module.exports = (Savebdd) =>{ 


function Savebdd() {
    fs.writeFile("./fonction/stockage/bdd.json", JSON.stringify(bdd, null, 4), (err) =>{
        if (err) message.channel.send("An error occurred while backing up.");
    });
   
}

Savebdd();


}