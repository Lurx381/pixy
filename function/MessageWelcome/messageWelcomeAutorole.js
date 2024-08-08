module.exports = (client) =>{
    
    client.on("guildMemberAdd", member => {
       
    member.guild.channels.cache.get("908419910567338015").send(`Welcome <@${member.user.id}> to the server!`);
    
    member.roles.add('1031510538645151764');

    
});

}