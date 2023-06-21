const { SlashCommandBuilder,EmbedBuilder} = require('discord.js');
// const {memeapi} =require('../config.json');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('welcome')
    .setDescription('welcome')
    .addUserOption(option => option.setName('target').setDescription('say welcome to').setRequired(true)),

  async execute(interaction) {
    
   
      interaction.reply({
        content:`welcome! ${interaction.options.getUser('target')}`,
        ephemeral:true
      });
    
  },
};