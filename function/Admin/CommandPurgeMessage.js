const config = require('../../config.json') 
module.exports = (client) =>{ 
    
    client.on("message", message => {

    if(message.content.startsWith(config.PREFIX + "clear")){

    message.delete();

        if(message.member.hasPermission('MANAGE_MESSAGES')){

            let args = message.content.trim().split(/ +/g);

            if(args[1]){
              if(!isNaN(args[1]) && args[1] >= 1 && args[1] <=99 ){
                  
                  message.channel.bulkDelete(args[1]);
                  message.channel.send(`You have deleted ${args[1]} messages`);
              }
              else{
                  message.channel.send("You must specify a value between 1 and 99! ( I cannot manage more than 99 because of my great chief discord :/) ")
              }
            }
            else {
              message.channel.send("You must specify a number of messages to delete!")
            }
            
        }
        else {
            message.channel.send('You do not have the permission to manage messages!')
        }
    }

  

});

}