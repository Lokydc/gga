//https://cdn.discordapp.com/guilds/${interaction.guildId}/users/${member.user.id}/avatars/${member.avatar}.png?size=4096

const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const a = require('../../../packages/get')
module.exports = async (client, interaction, user, t) => {

let member = interaction.guild.members.cache.get(user.id)
let user2 = await a.getUser(user.id, client.token)

let avatarURL = `https://cdn.discordapp.com/avatars/${user2.id}/${user2.avatar ? user2.avatar : 'undefined'}.${user2?.avatar?.substring(0,2) === "a_" ? "gif" : "png"}?size=1024`
if(member) {
    
    const button = new MessageButton()
        .setCustomId(`avatar${user.id}`)
        .setLabel(`${t('buttons:avatar.server')}`)
        .setStyle('PRIMARY')

        const button2 = new MessageButton()
        .setLabel(`${t('buttons:avatar.blowser')}`)
        .setStyle('LINK')
        .setURL(user.displayAvatarURL({ dinamic: true, size: 4096}))

        if(member.displayAvatarURL({ dynamic: true, size: 4096}) === user.displayAvatarURL({ dynamic: true, size: 4096})) {
            button.setDisabled(true)
        }

    const row = new MessageActionRow().addComponents(button2, button)
    const embed = new MessageEmbed()
    .setDescription(`${user}`)
    .setColor('#ED02B2')
    .setImage(user.displayAvatarURL({ dinamic: true, size: 4096}))
    interaction.reply({ embeds: [embed], components: [row], ephemeral: true })

    const filter = i => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 40000 });

collector.on('collect', async i => {
    if(i.user.id !== interaction.user.id) {
        i.reply({ content: `${t('commands:avatar.nobutton')}`, ephemeral: true})
    }
	if (i.customId === `avatar${user.id}`) {
    button.setCustomId(`avatarguild${user.id}`)
    button.setLabel(`${t(`buttons:avatar.global`)}`)
    const embed = new MessageEmbed()
    .setDescription(`${user}`)
    .setImage(member.displayAvatarURL({ dynamic: true, size: 4096}))
    .setColor('#ED02B2')
    i.update({ embeds: [embed], components: [row], ephemeral: true })

	} else if(i.customId === `avatarguild${user.id}`) {
    button.setCustomId(`avatar${user.id}`)
    button.setLabel(`${t('buttons:avatar.server')}`)
    const embed = new MessageEmbed()
    .setDescription(`${user}`)
    .setImage(user.displayAvatarURL({ dynamic: true, size: 4096}))
    .setColor('#ED02B2')
    i.update({ embeds: [embed], components: [row], ephemeral: true })
    }
});

collector.on('end', (collected, reason) => {
    if(reason === 'time') {
        button.setDisabled(true)
        interaction.editReply({ components: [row], ephemeral: true}).catch(err => {})
    }
    });
} else if(!member && user2) {
    

    const button2 = new MessageButton()
    .setLabel(`${t('buttons:avatar.blowser')}`)
    .setStyle('LINK')
    .setURL(avatarURL)

    const row = new MessageActionRow().addComponents(button2)
    const embed = new MessageEmbed()
    .setDescription(`${user}`)
    .setColor('#ED02B2')
    .setImage(avatarURL)
    interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
}
}