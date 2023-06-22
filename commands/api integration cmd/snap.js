
const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');
const {apiflickr} = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('snap')
        .setDescription('Provides an image searched by you')
        .addStringOption(option =>
            option
                .setName('image')
                .setDescription('search for image')
                .setRequired(true)
        ),
    async execute(interaction) {

        const query = interaction.options.getString('image');
        try {
            const response = await fetch(`${apiflickr}${query}&per_page=24&format=json&nojsoncallback=1`)
            const data =await  response.json()
            let photo = data.photos.photo;

            if(photo.length>0){
                let farm = photo[0].farm;
                let server = photo[0].server;
                let id = photo[0].id;
                let secret = photo[0].secret;
                let title = photo[0].title;
                let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`
                const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(interaction.user.username)
                .setAuthor({ name: `HelperBOT`, iconURL: interaction.user.displayAvatarURL(), url: 'https://github.com/softyAmir' })
                .addFields({name:'title',value:query,inline:false})
                .setImage(url)
                .setTimestamp()
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });
        
                     // interaction.member is the GuildMember object, which represents the user in the specific guild
                await interaction.reply({
                    embeds: [embed]
                });
            }else{
                await interaction.reply({
                    content:`There are no such photos available fo "${interaction.options.getString('image')}"`,
                    ephemeral:true
                })
            }

            
        } catch (error) {
            console.log(error);
        }
        
     


        
    },
};

