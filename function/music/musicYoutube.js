const config = require('../../config.json') //importing the config.json doc
const ytdl = require("ytdl-core"); //importing ytdl-core module
const queue = new Map();

module.exports = (client) =>{

    client.on("message", async message => {
        if (message.author.bot) return;
        if (!message.content.startsWith(config.PREFIX)) return;
      
        const serverQueue = queue.get(message.guild.id);
      
        if (message.content.startsWith(`${config.PREFIX}song`)) {
          execute(message, serverQueue).catch;
          return;
        } else if (message.content.startsWith(`${config.PREFIX}skip`)) {
          skip(message, serverQueue);
          return;
        } else if (message.content.startsWith(`${config.PREFIX}stop`)) {
          stop(message, serverQueue);
          return;
        } 
      });
      
      async function execute(message, serverQueue) {
        const args = message.content.split(" ");
      
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
          return message.channel.send(
            "You have to be in a voice channel to play music!"
          );
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
          return message.channel.send(
            "I need permissions to join and speak in your voice channel!"
          );
        }
      
        const songInfo = await ytdl.getInfo(args[1]);
        const song = {
              title: songInfo.videoDetails.title,
              url: songInfo.videoDetails.video_url,
         };
      
        if (!serverQueue) {
          const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
          };
      
          queue.set(message.guild.id, queueContruct);
      
          queueContruct.songs.push(song);
      
          try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
          } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
          }
        } else {
          serverQueue.songs.push(song);
          return message.channel.send(`${song.title} has been added to the queue!`);
        }
      }
      
      function skip(message, serverQueue) {
        if (!message.member.voice.channel)
          return message.channel.send(
            "You have to be in a voice channel to stop the music!"
          );
        if (!serverQueue)
          return message.channel.send("There's no song I could skip!");
        serverQueue.connection.dispatcher.end();
      }
      
      function stop(message, serverQueue) {
        if (!message.member.voice.channel)
          return message.channel.send(
            "You have to be in a voice channel to stop the music!"
          );
          
        if (!serverQueue)
          return message.channel.send("There's no song I could stop!");
          
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
      }
      
      function play(guild, song) {
        const serverQueue = queue.get(guild.id);
        if (!song) {
          serverQueue.voiceChannel.leave();
          queue.delete(guild.id);
          return;
        }
      
        const dispatcher = serverQueue.connection
          .play(ytdl(song.url))
          .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
          })
          .on("error", error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        serverQueue.textChannel.send(`Playing: **${song.title}**`);
      }


}