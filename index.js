require('dotenv').config();
const levels = require('./levels.json');
const axios = require('axios');
const fs = require("fs")
const { Client, GatewayIntentBits, discordSort, EmbedBuilder, PermissionsBitField } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
var kickingmbr
var moderatingmbr
var JSONthing
var lastmessage = ""

client.on('ready', () => {
    console.log('bot is ready');
    client.user.setPresence({
        status: "online",  //You can show online, idle....
        game: {
            name: "butter dog",  //The message shown
            type: "WATCHING" //PLAYING: WATCHING: LISTENING: STREAMING:
        }
    });
})

client.on('messageCreate', async (message) => {
    console.log(lastmessage)
    if (lastmessage == message.content) {
        message.delete()
        
    }
    lastmessage = message.content
    if (message.content === '!ping') {
        message.channel.send({
            content: 'pong',
        })
    }
    else if (message.content.startsWith("coems")) {
        if (message.guildId === "1100857886390882486"){
            message.channel.send("https://www.youtube.com/watch?v=Z2XTDZSo6oU")
            var role= message.guild.roles.cache.find(role => role.name === "coems 🤑");
            message.guild.members.cache.get(message.author.id).roles.add(role);
        }
        
    }
    else if (message.content === '!activity'){
        let resp = await axios.get(`https://www.boredapi.com/api/activity/`);
        const quote = resp.data.activity;
  
        message.channel.send({
            content: quote,
        })
    }
        


    else if (message.content === '!quote') {
        let resp = await axios.get(`https://api.quotable.io/random`);
        const quote = resp.data.content;
  
        message.channel.send({
            content: quote,
        })
    }
    else if (message.content.startsWith("!suggest")) {
        if (message.guildId === "1100857886390882486"){
        client.channels.cache.get('1102561743575711835').send({ embeds: [new EmbedBuilder()
            .setTitle(message.author.username + " suggested")
            .setDescription(message.content.replace("!suggest ", ""))]});
        }
    }
    else if (message.content.startsWith("!getavatar")) {
        
        var member = message.mentions.members.first().displayAvatarURL()
        message.channel.send(member)
        
    }

    else if (message.content.startsWith("!ban")) {
        
        var membercheck = message.mentions.members.first().kickable
        console.log(membercheck)
        if (message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        if (membercheck == true) {
            
                message.channel.send("Are you sure? Type ****!confirm**** to confirm, or ****!cancel**** to cancel.")
                moderatingmbr = message.author
            kickingmbr = message.mentions.members.first()
            
            
        }
    }
    else{
        message.channel.send("bro tried it 💀")
    }
    }
    else if (message.content.startsWith("!confirm")) {
        
        if (message.author == moderatingmbr)
        {
            message.channel.send("****Banned Successfully****")
            
            kickingmbr.ban()
            moderatingmbr = null
        }
    }
    else if (message.content.startsWith("!cancel")) {
        
        if (message.author == moderatingmbr)
        {
            kickingmbr = null
            message.channel.send("Cancelled")
            moderatingmbr = null
        }
    }
    else if (message.content.startsWith("!mute")) {
        
        var membercheck = message.mentions.members.first().kickable
        console.log(membercheck)
        if (message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
        if (membercheck == true) {
            message.mentions.members.first().timeout(60 * 60 * 1000, "timed out")
           
            
            
        }
    }
    
}
    else if (message.content.startsWith("!kick")) {
        
        var membercheck = message.mentions.members.first().kickable
        console.log(membercheck)
        if (message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
        if (membercheck == true) {
            message.mentions.members.first().kick()
           
            
            
        }
    }
    
    }


})

client.login(process.env.DISCORD_BOT_ID);


