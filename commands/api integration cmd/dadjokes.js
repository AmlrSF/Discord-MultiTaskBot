const { SlashCommandBuilder,EmbedBuilder,ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require('discord.js');
const {dadJokeApi} = require('../../config.json');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c16325f58emsh5dbcd0689f7282cp163d69jsn522885501ba7',
		'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
	}
};




module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('show random dad jokes'),
        
	async execute(interaction) {
        
        try {
            const response = await fetch(dadJokeApi, options);
            const result = await response.json();
            console.log(result);
            if (result.body && result.body.length > 0){
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(interaction.user.username)
                    .setURL('https://discord.js.org/')
                    .setAuthor({ name: `dad jokes`, iconURL: interaction.user.displayAvatarURL(), url: 'https://github.com/softyAmir' })
                    .addFields(
                        { name: 'type', value: result.body[0].type,inline :false },
                        { name: 'setup', value: result.body[0].setup,inline :false },
                        { name: 'punchline', value: result.body[0].punchline,inline :false },{
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
            }else{
                await interaction.reply({
                    content:'there is an error on this command, plase try later',
                    ephemeral:true
                });
            }
        } catch (error) {
            console.error(error);
        }
        
	},
};

