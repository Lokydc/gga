const Command = require('../../structures/Command')
const bitcoin = require('../../../packages/economy')
const Utils = require("../../util/Util")
const Levels = require("discord-xp");
const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require('discord.js')
const canvacord = require("canvacord");
const User = require('../../database/Schemas/User')


module.exports = async (client, interaction, t) => {
    const user = interaction.options.getUser('user')
    const data = await User.findOne({ user: interaction.user.id })
    const data2 = await User.findOne({ user: user.id  })
    const coins1 = await bitcoin.view(user)
    const coins2 = await bitcoin.view(interaction.user)

    let embedError = new MessageEmbed()
    .setTitle(`${t('errors:marry.databaseNO')}`)
    .setDescription(`${t('commands:marry.databaseNO', {user: user})}`)
    .setColor('RED')

    if(!data2 || !coins1) return interaction.reply({ embeds: [embedError], ephemeral: true})

    if(coins1.normal < 7000 || coins2.normal < 7000) return interaction.reply({ embeds: [new MessageEmbed().setDescription(`${t('commands:marry.nomoney')}(https://discord.gg/jujuba) | [link2](https://discord.gg/7fHTb9ukMd)`).setColor('DARK_VIVID_PINK').setFooter({ text: 'Taxa de casamento: 14,000 caramelos | taxa diária: 150 caramelos'})]})

    

    if(data.profile.marry.status === 'casado') return interaction.reply({ content: `${t('errors:marry.casadoyou')}`, ephemeral: true})
    if(data2.profile.marry.status === 'casado') return interaction.reply({ content: `${t('errors:marry.casadog')}`, ephemeral: true})

    let button1 = new MessageButton()
    .setLabel(`${t('buttons:marry.aceitar')}`)
    .setCustomId('aseitar')
    .setStyle('SUCCESS')

    let button2 = new MessageButton()
    .setLabel(`${t('buttons:marry.recusar')}`)
    .setCustomId('recusar')
    .setStyle('DANGER')

    const row = new MessageActionRow().addComponents(button1, button2)
    const row2 = new MessageActionRow().addComponents(button1)
    let time = ~~(Date.now() / 1000) + 120
    let msg = await interaction.reply({ content: `<:pb_attaboi:1000167758564167702> ${t('commands:marry.confirm', { user: user, author: interaction.user, time: `<t:${time}:R>`})}`, components: [row], fetchReply: true})

    const filter = user => user
    const collector = msg.createMessageComponentCollector({ filter: filter, time: 120000 })

    collector.on("collect", async (i) => {
        if(i.customId === 'aseitar') {
            if(i.user !== user) return i.reply({ content: `${t('errors:noperm.button')}`, ephemeral: true})
            await pushMarryForUsers(user.id, 'casado', interaction.user.id, Date.now())
            await pushMarryForUsers(interaction.user.id, 'casado', user.id, Date.now())

            await bitcoin.remove(user,7000)
            await bitcoin.remove(interaction.user, 7000)

            button1.setLabel(`${t('buttons:marry.casado')}`)
            button1.setDisabled(true)

            i.update({ components: [row2] })
        } else if(i.customId === 'recusar') {
            if(i.user !== user) return i.reply({ content: `${t('errors:noperm.button')}`, ephemeral: true})
            i.update({ components: [row2]})
        }
    })

}


async function pushMarryForUsers (user, status, marida, time) {
    const data = await User.findOne({ user: user})
    data.profile.marry.status = status
    data.profile.marry.parent = marida
    data.profile.marry.time = time
    data.badges.push("<:fp_love:1000171194038890566>")
    data.save()
}

async function getUserCoins(user) {
    let coins = await bitcoin.findUser(user.id, '968570313027780638')

    return coins.coinsInWallet
}

