const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json') 
module.exports = (client) =>{ 

    client.on("message",  async message => { 

        if(message.content.startsWith(config.PREFIX + "youtube")){
         message.delete();   
            const data = await fetch('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCZTiApraopd_HGwua9F0aug&key=AIzaSyCYoWHpd7oyCsk_-ChETT1UwvYDD4yK_1A').then(response => response.json());
            
            const embedyoutube = new MessageEmbed()
            .setColor('#f00020')
            .setTitle('Youtube')
            .setURL('https://www.youtube.com/channel/UCIZTse5bfpKjRw1CNn1ncgg')
            .setAuthor('Lurx', 'https://i.imgur.com/uzS0VeE', 'https://discord.gg/hJte8mB42S')
            .setDescription('Statistics')
            .setThumbnail('https://i.imgur.com/uzS0VeE')
            .addFields(
                { name: 'Number of subscribers: ', value: data.items[0].statistics.subscriberCount  , inline: true },
                { name: 'Number of videos: ', value: data.items[0].statistics.videoCount  , inline: true },
                { name: 'Number of views: ', value: data.items[0].statistics.viewCount  , inline: true },
            
                
            )
            
            .setImage('https://i.imgur.com/uzS0VeE')
            .setTimestamp()
            .setFooter('Pixy the Bot', 'https://i.imgur.com/uzS0VeE');
        
            message.channel.send(embedyoutube);
            
        }

    })
}