const {Client, IntentsBitField, EmbedBuilder, Message} = require('discord.js');
const fetch = require("node-fetch");
require ('dotenv').config();


const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', ()=>{
    console.log("Ready");
})

client.on('interactionCreate', (interaction)=>{
    if (!interaction.isChatInputCommand) return

    if(interaction.commandName === "search"){
        const searchString = interaction.options.get('search-string').value.trim();
        // interaction.reply(`Search Deez ${searchString}s`)
        const searchQuery = searchString.replace(/ /g, '+')
        async function getFirstSearchResult() {
            try {
                const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.JsonApiKey}&cx=${process.env.searchEngineId}&q=${searchQuery}`;
                const response = await fetch(url);
                const data = await response.json();
                const firstResultUrl = data.items[0].link;

                const embed = new EmbedBuilder().setTitle(searchString).setColor('Random').setURL(firstResultUrl).setDescription(firstResultUrl)
                interaction.reply({embeds: [embed]})
            
              console.log(firstResultUrl);
            } catch (error) {
              console.error('Error:', error);
            }
          }
          
          getFirstSearchResult();
    } 
})


client.login(process.env.SecretToken)