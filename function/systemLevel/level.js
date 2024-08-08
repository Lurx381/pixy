const bdd = require("../stockage/bdd.json")
const fs = require("fs");
const config = require('../../config.json') 

module.exports = (client) =>{

    client.on("message", message => {
        if (message.content.startsWith === config.PREFIX + 'lvl') {
            if (bdd["status-level"] == true) {
                bdd["status-level"] = false
                Savebdd();
                return message.channel.send('You have just stopped the level system!');
            } else {
                bdd["status-level"] = true;
                Savebdd();
                return message.channel.send('You have just started the level system!');
            }
        }

        if (bdd["status-level"] == true) {
            if (message.content.startsWith === config.PREFIX + 'level') {
                if (!bdd["user corners"][message.member.id]) return message.channel.send(`We haven't posted a message yet!`);
                return message.channel.send(`You have ${bdd["user corners"][message.member.id]} points ! And you're at the level n°${bdd["user level"][message.member.id]}`)
            }
            if (!bdd["user corners"][message.member.id]) {
                bdd["user corners"][message.member.id] = Math.floor(Math.random() * (4 - 1) + 1);
                bdd["user level"][message.member.id] = 0;
                Savebdd();
            } else {
                let new_coins = bdd["user corners"][message.member.id] + Math.floor(Math.random() * (4 - 1) + 1);
                if (bdd["user corners"][message.member.id] < 100 && new_coins >= 100) {
                    bdd["user level"][message.member.id] = 1;
                    bdd["user corners"][message.member.id] = new_coins;
                    Savebdd();
                    return message.channel.send(`Nice ${message.author} you've passed level 1!`);
                }
                if (bdd["user corners"][message.member.id] < 250 && new_coins >= 250) {
                    bdd["user level"][message.member.id] = 2;
                    bdd["user corners"][message.member.id] = new_coins;
                    Savebdd();
                    return message.channel.send(`Nice ${message.author} you've passed level 2!`);
                }
                if (bdd["user corners"][message.member.id] < 500 && new_coins > 500) {
                    bdd["user level"][message.member.id] = 3;
                    bdd["user corners"][message.member.id] = new_coins;
                    Savebdd();
                    return message.channel.send(`Nice ${message.author} you've passed level 3!`);
                }
                if (bdd["user corners"][message.member.id] < 1000 && new_coins > 1000) {
                    bdd["user level"][message.member.id] = 4;
                    bdd["user corners"][message.member.id] = new_coins;
                    Savebdd();
                    return message.channel.send(`Nice ${message.author} you've passed level 4!`);
                }
            }
        }
        
});

function addRandomInt(member) {
    bdd["user corners"][member.id] = bdd["user corners"][member.id] + Math.floor(math.random() * (4-1) +1);
    Savebdd();
}

function Savebdd() {
    fs.writeFile("./fonction/stockage/bdd.json", JSON.stringify(bdd, null, 4), (err) =>{
        if (err) message.channel.send("An error occurred while backing up.");
    });
   
}

Savebdd();


}
