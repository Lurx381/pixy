const discord = require('discord.js')

const moment = require('moment');

const config = require('../../config.json');

module.exports = (client) =>{ 
   
    client.on("message", message => { 
        
        if (message.content.startsWith(config.PREFIX + "info")) {
            if(message.mentions.users.first()) {
                user = message.mentions.users.first();
           } else{
                user = message.author;
            }
            const member = message.guild.member(user);
    
            const embed = new discord.MessageEmbed() 
            .setColor('#ff5555')
            .setThumbnail(user.avatarURL)
            .setTitle(`Information on ${user.username}#${user.discriminator} :`)
            .addField('Account ID:', `${user.id}`, true)
            .addField('User ID on the server:', `${member.nickname ? member.nickname : 'Aucun'}`, true)
            .addField('Account created on:', `${moment(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
            .addField('Joined the server on:', `${moment(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
            .addField('Status:', `${user.presence.status}`, true)
            .addField('Playing:', `${member.user.presence.game || 'Not playing a game.'}`, true)
            .addField('Roles:', member.roles.cache.map(roles => `${roles.name}`).join(', '), true)
            .addField(`In response to:`,`${message.author.username}#${message.author.discriminator}`)
        message.channel.send(embed).then(message => message.delete({ timeout: 1500000 }));
        }
    });

}