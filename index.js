const { Client, Intents } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const { addSpeechEvent } = require("discord-speech-recognition");

require('dotenv').config();

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
  // If bot didn't recognize speech, content will be empty
  if (!msg.content) return;

  msg.author.send(msg.content);
});

client.on("ready", () => {
  console.log("Ready!");
});

client.login(process.env.DISCORD_TOKEN);