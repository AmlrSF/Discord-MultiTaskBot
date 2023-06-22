const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('feeling lost?.')
       ,
	async execute(interaction) {

        
        const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Command Help')
        .setDescription('Here are some commands to assist you.')
        .addFields(
            { 
                name: '/user [user]',
                value: 'Get information about a user.',
                inline: false
            },
            {
                name: '/snap [image]',
                value: 'Display a searched image.',
                inline: false
            },
            {
                name: '/wiki [search] [paragraphs]',
                value: 'Search Wikipedia and display the results.',
                inline: false
            },
            {
                name: '/joke',
                value: 'Get a random joke.',
                inline: false
            },
            {
                name: '/quote [tag]',
                value: 'Get a random quote.',
                inline: false
            },{
                name: '/meme [tag]',
                value: 'Get a random meme.',
                inline: false
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
        )
        .setTimestamp()
        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });
        
    // Send the embed as a reply
    await interaction.reply({ embeds: [embed] })
    }
}