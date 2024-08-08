const config = require('../../config.json') 
module.exports = (client) =>{ 

    client.on("message", message => {

        if (message.content.startsWith('!ban')) {
            const user = message.mentions.users.first();
            if (user) {
              const member = message.guild.members.resolve(user);
              if (member) {
                member
                  .ban({
                    reason: 'They were bad!',
                  })
                  .then(() => {
                    message.channel.send(`Successfully banned ${user.tag}`);
                  })
                  .catch(err => {
                    message.channel.send('I do not have the permission to do that.');
                    console.error(err);
                  });
              } else {
                message.channel.send("That user isn't in this server!");
              }
            } else {
              message.channel.send("You didn't mention a user!");
            }
          }

    })
}
