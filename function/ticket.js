const config = require('../config.json')  
const discord = require("discord.js");

module.exports = (client ) =>{ 
    client.on("message", async message => {
        if (message.author.bot) {
            return;
        }
    
        if (message.channel.type === "dm") {
            const msg = message.content;
    
            const guild = client.guilds.cache.find(g => g.id === `${config.guildSupport}`);
    
            let category = guild.channels.cache.find(c => c.name === "Tickets" && c.type === "category");
            if (!category) category = await guild.channels.create("Tickets", {type: "category", position: 1});
    
            if (!guild.channels.cache.find(c => c.name === `${message.author.id}-mp`)) {
                guild.channels.create(`${message.author.id}-mp`, {
                    permissionOverwrites: [
                        {
                            deny: "VIEW_CHANNEL",
                            id: guild.id
                        },
                    ],
                    parent: category.id,
                    topic: `${message.author.id}`,
                })
                .then(ch => {
                    const e = new discord.MessageEmbed()
                    .setTitle("Member asks for help")
                    .setColor("#2F3136")
                    .setDescription(`User: ${message.author.tag}\nID: ${message.author.id}`)
                    .setFooter("Please click to 🔒 close the ticket")
                    .addField("His question:", msg)
    
                    ch.send(e)
                    .then(msg => {
                        msg.react("🔒")
                    })
                })
            }
            else {
                const channelTicket = guild.channels.cache.find(c => c.name === `${message.author.id}-mp`)
    
                const e = new discord.MessageEmbed()
                .setTitle("A new question:")
                .setColor("#2F3136")
                .addField("His question:", msg)
    
                channelTicket.send(e)
            }
        }
        else {
            if (message.channel.name.endsWith("-mp")) {
                const msg = message.content;
    
                message.delete();
    
                const e1 = new discord.MessageEmbed()
                .setTitle(message.author.tag)
                .setColor("#2F3136")
                .setDescription(msg)
    
                message.channel.send(e1)
    
                const user = await client.users.fetch(`${message.channel.topic}`);
    
                const e2 = new discord.MessageEmbed()
                .setTitle("Staff response")
                .setColor("#2F3136")
                .addField(message.author.tag, msg)
    
                await user.send(e2)
                .then(msg => {
                    msg.react("📥")
                })
            }
            else {
            }
        }
    })
    
    client.on("messageReactionAdd", (reaction, user) => {
        if (user.bot) {
            return;
        }
        const { message } = reaction
        
        if (reaction.emoji.name === "🎟️") {
            reaction.users.remove(user.id)
            message.guild.channels.create(`${user.id}-ticket`, {
                permissionOverwrites: [
                    {
                        deny: "VIEW_CHANNEL",
                        id: message.guild.id
                    },
                    {
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "ADD_REACTIONS"],
                        id: user.id
                    }
                ]
            })
            .then(ch => {
                const e = new discord.MessageEmbed()
                .setTitle("New Ticket")
                .setColor("#2F3136")
                .setDescription(`User: ${user.tag}\nID: ${user.id}`)
                .setFooter("To close the ticket please click on the reaction below.")
    
                ch.send(e)
                .then(msg => {
                    msg.react("🔒")
                })
            })
        }
        else if (reaction.emoji.name === "🔒") {
            if (message.channel.name.endsWith("-ticket") || message.channel.name.endsWith("-mp")) {
                message.channel.delete()
            }
            else {
                return;
            }
        }
    });
}