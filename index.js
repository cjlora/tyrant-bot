const { Client, Intents } = require("discord.js");
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

client.on("speech", (msg) => {
  //msg.author.send(msg.content);
  if(msg.content == "cabbage"){
    let channel = msg.guild.channels.cache.get(msg.member.voice.channel.id);
    for (const member of channel.members.values()){
      member.voice.setMute();
      member.voice.setDeaf();
    }
    /* memers = msg.author.voiceChannel.members;
    if(members == null)
          return;
    members.forEach(traverse); */
  }
  
/*       await member.edit(mute=True);
      await member.edit(deafen=True);
  } */

  client.channels.cache.get(`995556648846381128`).send(msg.content);

});

client.on("ready", () => {
  console.log("Ready!");
});

client.login("OTk1Njg2NTM2NjgxMDk1MzUw.GreDx3.SKSUZhpHlBhlMoCns_Hhj93Bjhg70Fq1pN0jd4");
