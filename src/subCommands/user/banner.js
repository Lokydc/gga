//https://cdn.discordapp.com/guilds/${interaction.guildId}/users/${member.user.id}/avatars/${member.avatar}.png?size=4096
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const a = require('../../../packages/get')

module.exports = async (client, interaction, membro, t) => {
    let user2 = await a.getUser(membro.id, client.token)
    let bannerURL = `https://cdn.discordapp.com/banners/${user2.id}/${user2.banner ? user2.banner : 'undefined'}.${user2?.banner?.substring(0,2) === "a_" ? "gif" : "png"}?size=512`

    if(bannerURL.includes('undefined')) return interaction.reply({ content: `${t('commands:banner.error')}`, ephemeral: true})
    let embed = new MessageEmbed()
    .setImage(bannerURL)
    .setColor('DARK_VIVID_PINK')
    .setFooter({ text: `${user2.username} | ${user2.id}`})
    interaction.reply({embeds: [embed], ephemeral: true}) 
}

