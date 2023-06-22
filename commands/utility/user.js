const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.')
        .addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to hello')
				.setRequired(false)
        ),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		const target = interaction.options.getUser('target') || interaction.user;
        // console.log(target);
        // inside a command, event listener, etc.
        const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(target.username)
        .setURL('https://discord.js.org/')
        .setAuthor({ name: `HelperBOT`, iconURL: target.displayAvatarURL(), url: 'https://github.com/softyAmir' })
        .setImage(target.displayAvatarURL())
        .setTimestamp()
        .setFooter({ text: target.tag, iconURL: target.displayAvatarURL() });

        
         // interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply({
            embeds: [embed]
        });
	},
};