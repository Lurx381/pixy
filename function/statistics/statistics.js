const { MessageEmbed } = require('discord.js');
const config = require('../../config.json') 


module.exports = (client ) =>{ 

    client.on("message", message => {

    if(message.content.startsWith( config.PREFIX + "stats")){
    message.delete();
        let onlines = message.guild.members.cache.filter(
            ({ presence }) => presence.status !== 'offline').size;

        let totalmembers = message.guild.members.cache.size;

        let totalservers = client.guilds.cache.size;

       

       
         //console.log(onlines,  totalmembers, totalservers, totalbots, totalrole   )

        const embedstats = new MessageEmbed()
	.setColor('#f00020')
	.setTitle('Statistics')
	.setURL('https://discord.gg/MUve52zZ88')
	.setAuthor('Pixy the Bot', 'https://imgur.com/a/98icAH5', 'https://discord.gg/MUve52zZ88')
	.setDescription('The statistics ')
	.setThumbnail('https://imgur.com/a/98icAH5')
	.addFields(
		{ name: 'Connected members: ', value: onlines , inline: true },
		{ name: 'Total members on the server: ', value: totalmembers , inline: true },
        { name: 'Number of servers to which the bot belongs: ', value: totalservers, inline: true },
		
	)
	
	.setImage('https://imgur.com/a/98icAH5')
	.setTimestamp()
	.setFooter('', 'https://imgur.com/a/98icAH5');

    message.channel.send(embedstats);
    }

    });

}