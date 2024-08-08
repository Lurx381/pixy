
const discord = require('discord.js')
const client = new discord.Client({
    intents: ['DirectMessageReactions', 'DirectMessageTyping','DirectMessages', 'GuildBans', 'GuildEmojisAndStickers', 'GuildIntegrations', 'GuildInvites', 'GuildMembers', 'GuildMessageReactions', 'GuildMessageTyping', 'GuildMessages', 'GuildPresences', 'GuildScheduledEvents', 'GuildVoiceStates', 'GuildWebhooks', 'Guilds', 'MessageContent']
});



const config = require('./config.json')  
const handler = require("./function/role/rolecommand") 
const MusicYT = require("./function/music/musicYoutube")
const Welcome = require("./function/MessageWelcome/messageWelcome")
const arrive = require("./function/MessageWelcome/messageWelcome")
const DeleteMessage = require("./function/Admin/CommandePurgeMessage")
const message_Welcome = require("./function/Admin/CommandMessageWelcome")
const warn = require("./function/Admin/Commandwarn")
const stats = require("./function/statistics/statistics")
const statsyoutube = require("./function/Youtube/APIgoogle")
const ban = require ("./function/Admin/CommandBan")
const level = require("./function/systemLevel/level")
const guild = require("./function/stockage/guildcreate") 
const bdd = require("./function/stockage/bdd.json")
const userinfo = require("./function/userinfo/userinfo")
const ticket = require("./function/ticket")

const queue = new Map();


client.on("ready", async ()  => { 

    console.log("ok");
   
    handler(client, config);
    
    MusicYT(client);

    ticket(client);

    //Bienvenu(client);

    //depart(client);

    DeleteMessage(client);

    // message_bienvenue(client, message_bienvenue);

    warn(client);

    stats(client);

    statsyoutube(client);
    
    ban(client);

    guild(client);

    userinfo(client);

    let statuts = bdd.stats
    setInterval(function() {
        let stats = statuts[Math.floor(Math.random()*statuts.length)];
        client.user.setActivity(stats, {type: "STREAMING"})
    }, 10000)
   client.user.setStatus("dnd");

       
  });
    

  



 







client.login(config.token)  