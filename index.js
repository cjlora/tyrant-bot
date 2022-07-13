const { Client, Intents, MessageFlags } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const { addSpeechEvent } = require("discord-speech-recognition");

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
try {
  client.on("speech", (msg) => {
    if(msg.author.id == "447933732993630209"){
      client.channels.cache.get(`732921988255055922`).send(msg.content);
  
      if(msg.content == "silence"){
        let channel = msg.guild.channels.cache.get(msg.member.voice.channel.id);
        for (const member of channel.members.values()){
          if(member.id == "447933732993630209" || member.id == "995686536681095350")
            continue;
          member.voice.setMute();
          member.voice.setDeaf();
        }
      }
  
      if(msg.content == "hear me"){
        let channel = msg.guild.channels.cache.get(msg.member.voice.channel.id);
        for (const member of channel.members.values()){
          if(member.id == "447933732993630209" || member.id == "995686536681095350")
            continue;
          member.voice.setMute(false);
          member.voice.setDeaf(false);
        }
      }
    }
  
  
  });
}
catch(err) {
  console.log("error!"+ err);
}


client.on("ready", () => {
  console.log("Ready!");
});

client.login("OTk1Njg2NTM2NjgxMDk1MzUw.GreDx3.SKSUZhpHlBhlMoCns_Hhj93Bjhg70Fq1pN0jd4");
