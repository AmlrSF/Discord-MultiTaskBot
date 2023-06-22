const { EmbedBuilder,Events } = require('discord.js'); // Replace 'your-embed-library' with the actual library you're using for embeds

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(member) {
    const welcomeChannelName = 'welcome'; // Replace with the name of your welcome channel
    const welcomeChannel = member.guild.channels.cache.find(
      (channel) => channel.name === welcomeChannelName
    );
    if (!welcomeChannel) return;

    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Welcome, ${member.user.username}! We hope you enjoy your stay in our server.`)
      .setImage(member.user.displayAvatarURL())
      .setTimestamp();

    await welcomeChannel.send({
      embeds: [embed],
      ephemeral: true
    });
  }
};
