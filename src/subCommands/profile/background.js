
const Command = require('../../structures/Command')
const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js')
const User = require('../../database/Schemas/User')
const Economy = require('../../../packages/economy')
const p = require('../../../packages/shop')

module.exports = async (client, interaction, t) => {
    const user = await User.findOne({ user: interaction.user.id })
    const coins = await Economy.view(interaction.user)
    let page = 0

    let embeds = await p.pages()

    const ButtonBuy = new MessageButton()
    .setLabel(`${t('buttons:background.buy')}`)
    .setCustomId('buy')
    .setStyle('SUCCESS')
    .setEmoji('🛒')

    const ButtonEquip = new MessageButton()
    .setCustomId('equip')
    .setStyle('SECONDARY')
    .setEmoji('📥')
    .setLabel(`${t('buttons:background.equip')}`)

    const ButtonVoltar = new MessageButton()
    .setCustomId('back')
    .setEmoji('⬅️')
    .setStyle('PRIMARY')
    .setDisabled(true)

    const ButtonProximo = new MessageButton()
    .setCustomId('next')
    .setEmoji('➡️')
    .setStyle('PRIMARY')

    if(!embeds[1]) ButtonProximo.setDisabled(true)

    if(coins.normal < embeds[page].value && !user.profile.backgrounds.includes(embeds[page].image)) {
        ButtonBuy.setDisabled(true)
        ButtonEquip.setDisabled(true)
        ButtonBuy.setLabel(`${t('buttons:background.nomoney')}`)
        ButtonBuy.setStyle('DANGER')
        ButtonEquip.setLabel(`${t('buttons:background.nopo')}`)
        ButtonEquip.setStyle('DANGER')
    } else if(coins.normal >= embeds[page].value && !user.profile.backgrounds.includes(embeds[page].image)){
            ButtonBuy.setDisabled(false)
            ButtonBuy.setLabel(`${t('buttons:background.buy')}`)
            ButtonBuy.setStyle('SUCCESS')
            ButtonEquip.setDisabled(true)
            ButtonEquip.setLabel(`${t('buttons:background.nopo')}`)
            ButtonEquip.setStyle('DANGER')
    } else if(user.profile.backgrounds.includes(embeds[page].image) && user.profile.layout.background !== embeds[page].image) {
        ButtonBuy.setDisabled(true)
        ButtonBuy.setLabel(`${t('buttons:background.yespo')}`)
        ButtonBuy.setStyle('SUCCESS')
        ButtonEquip.setDisabled(false)
        ButtonEquip.setLabel(`${t('buttons:background.equip')}`)
        ButtonEquip.setStyle('SECONDARY')
    } else if(user.profile.backgrounds.includes(embeds[page].image) && user.profile.layout.background === embeds[page].image) {
        ButtonBuy.setDisabled(true)
        ButtonBuy.setLabel(`${t('buttons:background.yespo')}`)
        ButtonBuy.setStyle('SUCCESS')
        ButtonEquip.setDisabled(true)
        ButtonEquip.setLabel(`${t('buttons:background.yese')}`)
        ButtonEquip.setStyle('PRIMARY')
    }

    const row = new MessageActionRow().addComponents(ButtonVoltar, ButtonBuy, ButtonEquip, ButtonProximo)

    let msg = await interaction.reply({ embeds: [embeds[0].embed], components: [row], fetchReply: true })

    const filter = user => user

    const collector = msg.createMessageComponentCollector({ filter: filter, time: 60000})

    collector.on('collect', async (i) => {
        if(i.user !== interaction.user) return i.reply({ content: `${t('errors:noperm.button')}`, ephemeral: true})

        collector.resetTimer()

        if(i.customId === 'next') {
            page = page + 1

            if(coins.normal < embeds[page].value && !user.profile.backgrounds.includes(embeds[page].image)) {
                ButtonBuy.setDisabled(true)
                ButtonEquip.setDisabled(true)
                ButtonBuy.setLabel(`${t('buttons:background.nomoney')}`)
                ButtonBuy.setStyle('DANGER')
                ButtonEquip.setLabel(`${t('buttons:background.nopo')}`)
                ButtonEquip.setStyle('DANGER')
            } else if(coins.normal >= embeds[page].value && !user.profile.backgrounds.includes(embeds[page].image)){
                    ButtonBuy.setDisabled(false)
                    ButtonBuy.setLabel(`${t('buttons:background.buy')}`)
                    ButtonBuy.setStyle('SUCCESS')
                    ButtonEquip.setDisabled(true)
                    ButtonEquip.setLabel(`${t('buttons:background.nopo')}`)
                    ButtonEquip.setStyle('DANGER')
            } else if(user.profile.backgrounds.includes(embeds[page].image) && user.profile.layout.background !== embeds[page].image) {
                ButtonBuy.setDisabled(true)
                ButtonBuy.setLabel(`${t('buttons:background.yespo')}`)
                ButtonBuy.setStyle('SUCCESS')
                ButtonEquip.setDisabled(false)
                ButtonEquip.setLabel(`${t('buttons:background.equip')}`)
                ButtonEquip.setStyle('SECONDARY')
            } else if(user.profile.backgrounds.includes(embeds[page].image) && user.profile.layout.background === embeds[page].image) {
                ButtonBuy.setDisabled(true)
                ButtonBuy.setLabel(`${t('buttons:background.yespo')}`)
                ButtonBuy.setStyle('SUCCESS')
                ButtonEquip.setDisabled(true)
                ButtonEquip.setLabel(`${t('buttons:background.yese')}`)
                ButtonEquip.setStyle('PRIMARY')
            }

            if(!embeds[page + 1]) {
                ButtonProximo.setDisabled(true)
            } else {
                ButtonProximo.setDisabled(false)
            }

            if(!embeds[page - 1]) {
                ButtonVoltar.setDisabled(true)
            } else {
                ButtonVoltar.setDisabled(false)
            }

            i.update({ embeds: [embeds[page].embed], components: [row]})
        } else if(i.customId === 'back') {
            page = page - 1

            if(!embeds[page - 1]) {
                ButtonVoltar.setDisabled(true)
            } else {
                ButtonVoltar.setDisabled(false)
            }

            if(!embeds[page + 1]) {
                ButtonProximo.setDisabled(true)
            } else {
                ButtonProximo.setDisabled(false)
            }

            if(coins.normal < embeds[page].value && !user.profile.backgrounds.includes(embeds[page].image)) {
                ButtonBuy.setDisabled(true)
                ButtonEquip.setDisabled(true)
                ButtonBuy.setLabel(`${t('buttons:background.nomoney')}`)
                ButtonBuy.setStyle('DANGER')
                ButtonEquip.setLabel(`${t('buttons:background.nopo')}`)
                ButtonEquip.setStyle('DANGER')
            } else if(coins.normal >= embeds[page].value && !user.profile.backgrounds.includes(embeds[page].image)){
                    ButtonBuy.setDisabled(false)
                    ButtonBuy.setLabel(`${t('buttons:background.buy')}`)
                    ButtonBuy.setStyle('SUCCESS')
                    ButtonEquip.setDisabled(true)
                    ButtonEquip.setLabel(`${t('buttons:background.nopo')}`)
                    ButtonEquip.setStyle('DANGER')
            } else if(user.profile.backgrounds.includes(embeds[page].image) && user.profile.layout.background !== embeds[page].image) {
                ButtonBuy.setDisabled(true)
                ButtonBuy.setLabel(`${t('buttons:background.yespo')}`)
                ButtonBuy.setStyle('SUCCESS')
                ButtonEquip.setDisabled(false)
                ButtonEquip.setLabel(`${t('buttons:background.equip')}`)
                ButtonEquip.setStyle('SECONDARY')
            } else if(user.profile.backgrounds.includes(embeds[page].image) && user.profile.layout.background === embeds[page].image) {
                ButtonBuy.setDisabled(true)
                ButtonBuy.setLabel(`${t('buttons:background.yespo')}`)
                ButtonBuy.setStyle('SUCCESS')
                ButtonEquip.setDisabled(true)
                ButtonEquip.setLabel(`${t('buttons:background.yese')}`)
                ButtonEquip.setStyle('PRIMARY')
            }

            i.update({ embeds: [embeds[page].embed], components: [row]}) 
        } else if(i.customId === 'buy') {
            if(coins.normal < embeds[page].value) return i.reply({ content:  `${t('buttons:background.nomoney')}`, ephemeral: true})

            await Economy.remove(interaction.user, embeds[page].value)
            user.profile.backgrounds.push(embeds[page].image)
            user.save()

            interaction.channel.send({ content: `🛒 | ${interaction.user}, background **${embeds[page].name}** ${t('commands:background.success')}!`})
        } else if(i.customId === 'equip') {
            if(!user.profile.backgrounds.includes(embeds[page].image)) return i.reply({ content: `${t('errors:noperm.noback')}`, ephemeral: true})
            user.profile.layout.background = embeds[page].image;
            user.save()

            interaction.channel.send({ content: `📥 | ${interaction.user}, background **${embeds[page].name}** ${t('commands:background.equip')}`})
        }
    })
}
