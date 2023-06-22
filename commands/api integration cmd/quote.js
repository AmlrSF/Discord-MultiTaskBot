
const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');
const {quoteapi} = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Provides an image searched by you')
        .addStringOption(option =>
            option
                .setName('tag')
                .setDescription('sth st search for')
                .setRequired(false)
        ),
    async execute(interaction) {

        const query = interaction.options.getString('search');
        try {
            const response = await fetch(`${quoteapi}${query ? `?tags=${query}`:'' }`)
            const data =await  response.json()
            console.log(data);
            
            let author = data[0].author;
            let content = data[0].content;
            let dateAdded = data[0].dateAdded;

            const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Quotes")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL(), url: 'https://github.com/softyAmir' })
            .addFields({name:'author',value:author,inline:false},
            {name:'quote',value:`"${content}"`,inline:false},
            {name:'published time',value:dateAdded,inline:false},{
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            )
            .setTimestamp()
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });

            // interaction.member is the GuildMember object, which represents the user in the specific guild
            await interaction.reply({
                embeds: [embed]
            });
        
           
        } catch (error) {
            console.log(error);
        }
        

        
    },
};

