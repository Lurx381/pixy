module.exports = (client,config) =>{ //recovering Client and config element from the index file.js
    
      
    //Command to add roles via commands
    client.on('message',m=>{  //
       //function for creating the command
        if(m.content[0]==config.PREFIX){ // prefix retrieval and config element 
            m.cmd = m.content.replace(config.PREFIX,"").split(config.separator)// Prefix +  command_name
            let command_Role =  config.commands.find(c=> c.command_name == m.cmd[0])
            //function command role
            if(command_Role){
                m.member.roles.add(command_Role.role_id).then(mf=>{// adding roles to a specific member retrieving the command_Role and Role ID to know which to give to the user
                    message.delete();
                    m.channel.send("Your role has been added")//the BOT will answer this
                    
                    //recovering cached error
                }).catch(err=>{
                    m.channel.send("Unable to add role ("+err.message+")") //the BOT will answer this
                })
            }else{
                /*Other personal order
                if(m.cmd[0] == "!COMMAND NAME"){
    
                }else if(m.cmd[0] == "!COMMAND NAME"){
    
                }else{
                    //unknown command
                }*/
            }
        }
    })
}