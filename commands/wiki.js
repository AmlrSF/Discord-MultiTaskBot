const { SlashCommandBuilder,EmbedBuilder,ActionRowBuilder,ButtonBuilder, ButtonStyle } = require('discord.js');
const {wikiap} = require('../config.json');



module.exports = {
	data: new SlashCommandBuilder()
        .setName('wiki')
        .setDescription('wikipedia search ')
        .addStringOption(option =>
            option
                .setName('query')
                .setDescription('sth to searh for')
                .setRequired(true))
        .addStringOption(option=>
            option
                .setName('limit')
                .setDescription('to set a amount of information')
                .setRequired(false)
        )
    ,
	async execute(interaction) {
        try {
            var limit = interaction.options.getString('limit') || '1';

            const data = await fetch(`${wikiap}limit=${limit}&format=json&origin=*&srsearch=${interaction.options.getString('query')}`);
            const jsondata = await data.json();
            const finalData = jsondata.query.search;

            let string =finalData.map(wiki=>{
                return wiki.snippet.replace(/<\/?span[^>]*>/g, '')
            }).join('');

            // inside a command, event listener, etc.
            const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("wiki")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL(), url: 'https://discord.js.org' })
            .setDescription(`information for ${interaction.options.getString('query')}`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields(
                { name: 'title',value:interaction.options.getString('query') },
                { name: 'description', value: string, inline: false },
                { name: 'published at ', value: finalData[0].timestamp, inline: false },{
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
            )
            .setTimestamp()
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });


            const moreinfo = new ButtonBuilder()
	        .setLabel(`More Info For "${interaction.options.getString('query')}"`)
	        .setURL(`https://en.wikipedia.org/?curid=${finalData[0].pageid}`)
	        .setStyle(ButtonStyle.Link);


            const row = new ActionRowBuilder()
            .addComponents(moreinfo);

            // interaction.member is the GuildMember object, which represents the user in the specific guild
            await interaction.reply({
                embeds: [exampleEmbed],
                components: [row],
            });
            console.log(finalData);
        }catch(e){
            await interaction.reply({
               content:'too much information, try decrease the limit',
               ephemeral:true
            });
        }
	},

};