const {REST, Routes, ApplicationCommandOptionType} = require("discord.js");
require('dotenv').config();

const commands = [{
    name:'search',
    description:'Searches on google and returns top result',
    options:[
        {
        name:'search-string',
        description:'The string that is supposed to be searched',
        type:ApplicationCommandOptionType.String,
        required:true,
    },
    ]
    
}]

const rest = new REST({version:'10'}).setToken(process.env.SecretToken);

(async ()=>{
    try {
        console.log("Registering commands");
        await rest.put(Routes.applicationGuildCommands(process.env.BotID, process.env.StarvingServerId), {body: commands})
        console.log("Commands Registered");
        
    } catch (error) {
        console.log("Commands could not be registered", error);
        
    }
})();