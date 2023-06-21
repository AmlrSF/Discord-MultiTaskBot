const { 
	Client,
	Events,
	Collection,
	GatewayIntentBits,AttachmentBuilder,EmbedBuilder
} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { token,clientId, guildId } = require('./config.json');
const Canvas = require('@napi-rs/canvas');
const { log } = require('node:console');
const { createCanvas, Image } = require('@napi-rs/canvas');
const { readFile } = require('fs/promises');
const { request } = require('undici');

require('dotenv').config();


const client = new Client({
	 intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildMessages] 
}).on('guildMemberAdd',(member)=>{
	console.log(`${member.user.tag} has joined the server.`);
})

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));



for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	// console.log(command);
	
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});




client.on(Events.GuildMemberAdd, async member => {
	const welcomeChannelName = 'welcome'; // Replace with the name of your welcome channel
	// log(member.user.username)
	const welcomeChannel = member.guild.channels.cache.find(
	  (channel) => channel.name === welcomeChannelName 
	);
	if (!welcomeChannel) return;
	
	// inside a command, event listener, etc.
	const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle(`Welcome, ${member.user.username}! We hope you enjoy your stay in our server.`)
	.setImage(member.user.displayAvatarURL())
	.setTimestamp()



	await welcomeChannel.send({
		embeds : [embed],
		ephemeral:true
	})
	
});

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

});



client.login(token);