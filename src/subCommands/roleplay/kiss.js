const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const ta = require('./functions/gifs.js')
module.exports = async (client, interaction, t) => {
    const user = interaction.options.getUser('user')

    if(user.bot) return interaction.reply({ content: `${t('errors:userbot')}`, ephemeral: true})
    if(user.id === interaction.user.id) return interaction.reply({ content: `${t('errors:my')}`, ephemeral: true})

    const button = new MessageButton()
        .setCustomId(`dance${user.id}`)
        .setLabel(`${t('buttons:roleplay.return')}`)
        .setStyle('PRIMARY')
        .setEmoji('<:jujuba_retribuir:977839544013561896>')

    const row = new MessageActionRow().addComponents(button)

    let responseImage = await ta.kiss()
    const embed = new MessageEmbed()
    .setDescription(`<a:jujuba_dance:977848862331011072> **| ${interaction.user} ${t('commands:roleplay.kiss')} ${user}!**`)
    .setImage(responseImage)
    .setColor('#ED02B2')
    let msg = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true})

    const filter = i => i.user.id === i.user.id;
         const collector = msg.createMessageComponentCollector({ filter, time: 120000 });

collector.on('collect', async i => {
    if(i.user.id !== user.id) return i.reply({ content: `${t('errors:noperm.button')}`, ephemeral: true})
    
	if (i.customId === `dance${user.id}`) {
        let response = await ta.kiss()
        const embed = new MessageEmbed()
    .setDescription(`<a:jujuba_dance:977848862331011072> **| ${user} ${t('commands:roleplay.kiss')} ${interaction.user}!**`)
    .setImage(response)
    .setColor('#ED02B2')
    i.reply({ embeds: [embed], components: [] })
    interaction.editReply({ components: [] }).catch((err) => {})

	}
});

     
}