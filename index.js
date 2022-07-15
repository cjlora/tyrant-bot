const { Client, Intents } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const { addSpeechEvent } = require("discord-speech-recognition");

require('dotenv').config();
//require('events').EventEmitter.prototype._maxListeners = 100;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
addSpeechEvent(client);

client.on("messageCreate", (msg) => {
  const voiceChannel = msg.member?.voice.channel;
  if (voiceChannel) {
    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      selfDeaf: false,
    });
  }
});

client.on("speech", (msg) => {
  if (!msg.content) 
    return;
  if(msg.author.id == "468467136483033091"){
    if (!msg.content) 
      return;
    client.channels.cache.get(`995556648846381128`).send(msg.content);

    if(msg.content == "silence"){
      let channel = msg.guild.channels.cache.get(msg.member.voice.channel.id);
      for (const member of channel.members.values()){
        if(member.id == "468467136483033091" || member.id == "995686536681095350")
          continue;
        member.voice.setMute(true);
        member.voice.setDeaf(true);
      }
    }

    if(msg.content == "hear me"){
      let channel = msg.guild.channels.cache.get(msg.member.voice.channel.id);
      for (const member of channel.members.values()){
        if(member.id == "468467136483033091" || member.id == "995686536681095350")
          continue;
        member.voice.setMute(false);
        member.voice.setDeaf(false);
      }
    }
  }
});

client.on("ready", () => {
  console.log("Ready!");
});

client.login(process.env.DISCORD_TOKEN);