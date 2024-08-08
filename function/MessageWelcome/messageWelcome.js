const bdd = require("../stockage/bdd.json")

module.exports = (client) =>{
    
    client.on("guildMemberAdd", member => {
        if(bdd["message-Welcome"]) {
        
            member.guild.channels.cache.get("908419910567338015").send(bdd["message-Welcome"] + `<@${member.user.id}>`);
        
        }
        else {
            member.guild.channels.cache.get('908419910567338015').send("Welcome to the server!")
        }

        member.roles.add('672316280761614356');
        //member.guild.channels.cache.get("908419910567338015").send('Welcome new! <@${member.user.id}> on the server.`);
    
    
});

}
