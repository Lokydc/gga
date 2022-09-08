//<:bitcoin:970521426224353321>

const Command = require('../../structures/Command')
const Economy = require('../../../packages/economy')
const Utils = require("../../util/Util")
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = async (client, interaction, t) => {
       // interaction.channel.sendTyping()
    
    const user = interaction.options.getUser('user')
    const value = interaction.options.getNumber('value')
    
    

    const coinsV = await Economy.view(user)
    const coinsU = await Economy.view(interaction.user)
    if(user.id === interaction.user.id) return interaction.reply({ content: `${t('commands:pay.errors.user')}`, ephemeral: true })
        
     if(coinsU.normal < value) {
         interaction.reply({ content: `${t('commands:pay.errors.falsepix')}`, ephemeral: true})
     } else {
        const button = new MessageButton()
        .setCustomId('primary')
        .setLabel(`${t('buttons:pay.accept')}`)
        .setStyle('PRIMARY')
        .setEmoji('<:pb_attaboi:1000167758564167702>')
        const button2 = new MessageButton()
        .setCustomId('cancel')
        .setLabel(`${t('buttons:pay.recuse')}`)
        .setStyle('DANGER')

        const row = new MessageActionRow().addComponents(button, button2)
        const row2 = new MessageActionRow().addComponents(button)
        let time = ~~(Date.now() / 1000) + 60

         interaction.reply({
             content: `${t('commands:pay.confirm', {author: interaction.user, user: user, value: value, time: time})}`,
             components: [row]
         })
         
         const filter = user => user
         const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

collector.on('collect', async i => {
	if (i.customId === 'primary') {
    if(i.user.id === user.id) {
            
    let o = await Economy.pay(interaction.user, user, value)

    button.setEmoji('<:pb_yay:1000174906031493271>')
    button.setLabel(`${t('buttons:pay.ok')}`)
    button.setStyle('SUCCESS')
    button.setDisabled(true)
    i.update({ content: `${t('commands:pay.ok', {author: interaction.user, user: user, value: value})}` , components: [row2]}).catch(err => {})
        }
	} else if(i.customId === 'cancel') {
        if(i.user.id === interaction.user.id) {
        button.setEmoji('<:minerva_laser:1000173416734785748>')
        button.setLabel(`${t('buttons:pay.cancel')}`)
        button.setStyle('DANGER')
        button.setDisabled(true)
        await i.update({ components: [row2]}).catch(err => {})
        }
    }
});

collector.on('end', (collect, reason) => {
    if(reason === 'time') {
        button.setEmoji('⏳')
        button.setLabel(`${t('buttons:pay.timeout')}`)
        button.setStyle('DANGER')
        button.setDisabled(true)
        interaction.editReply({ components: [row2]}).catch((err) => {})
    }
});
     }
    }
