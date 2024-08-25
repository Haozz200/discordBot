const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const config = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", function (message) {
  console.log(message.content);
});

client.login(config.BOT_TOKEN);

client.on("messageCreate", function (message) {
  if (message.author.bot) return;
  message.reply({ content: "Hello From Bot" });
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'describe') {
    await interaction.reply('Nghao nghe vi en');
  }
});

const rest = new REST({ version: "10" }).setToken(config.BOT_TOKEN);

const commands = [
  {
    name: 'describe',
    description: 'Nghao nghe vi en',
  },
];

async function registerCommands() {
  try {
    console.log("Started refreshing application (/) commands.");
    
    await rest.put(Routes.applicationCommands(config.CLIENT_ID), { body: commands });
    
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

registerCommands();
