const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const { 
  joinVoiceChannel, 
  createAudioPlayer, 
  createAudioResource, 
  AudioPlayerStatus 
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const gTTS = require("gtts");
const { REST, Routes } = require("discord.js");
require('dotenv').config()


const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

// ... (the rest of your code remains the same)
const TOKEN =process.env.DISTOKEN;
const CLIENT_ID = "1227213236747898970";
const AUTHORIZED_USER_ID = "786247986681479240"; 
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
const SOVACURATION = "883623059037253682";
const NEVERMORE = "1108485622294904892";
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.user.id !== AUTHORIZED_USER_ID) {
    return interaction.reply("You are not authorized to use this command.");
  }
  if (interaction.commandName === "hin") {
    const text = interaction.options.getString("text");
    if (interaction.options.getString("text") == "exit") {
      connection.destroy();
    }

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply(
        "You need to be in a voice channel to use this command."
      );
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
      selfDeaf: true, // Add this line
      selfMute: true, // Add this line
    });

    const player = createAudioPlayer();
    connection.subscribe(player);

    const gtts = new gTTS(text, "en");
    gtts.save("tts.mp3", (err, result) => {
      if (err) {
        console.error(err);
        return interaction.reply(
          "An error occurred while generating the TTS audio."
        );
      }
      if (text == "mew") {
        const resource = createAudioResource("./mew.mp3");
        player.play(resource);
      } 
      else if (text == "gyatt") {
        const resource = createAudioResource("./gyatt.mp3");
        player.play(resource);
      } 
      
      else {
        const resource = createAudioResource("./tts.mp3");
        player.play(resource);

        player.on(AudioPlayerStatus.Idle, () => {
          // connection.destroy();
        });
      }

      interaction.reply(text);
    });
  }
});

const commands = [
  {
    name: "hin",
    description: "Make the bot speak text in a voice channel",
    options: [
      {
        name: "text",
        description: "The text you want the bot to speak",
        type: 3, // String
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
client.login(TOKEN);
process.stdin.resume()