const Command = require('../../structures/Command')
const bitcoin = require('discord-mongo-currency')
const Utils = require("../../util/Util")
const Levels = require("discord-xp");
const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require('discord.js')
const canvacord = require("canvacord");
const User = require('../../database/Schemas/User')


module.exports = async (client, interaction, t) => {
    const data = await User.findOne({ user: interaction.user.id})
    const user = client.users.cache.get(data.profile.marry.parent)
    const data2 = await User.findOne({ user: user.id })

    if(data.profile.marry.status !== 'casado') return interaction.reply({ content: `${t('errors:marry.nocasado')}`, ephemeral: true})



    if(!data2) return interaction.reply({ content: `${t('commands:marry.databaseNO', {user: user})}`, ephemeral: true})

    let button1 = new MessageButton()
    .setLabel(`${t('buttons:divorce.yes')}`)
    .setCustomId('aseitar')
    .setStyle('SUCCESS')

    let button2 = new MessageButton()
    .setLabel(`${t('buttons:divorce.no')}`)
    .setCustomId('recusar')
    .setStyle('DANGER')

    const row = new MessageActionRow().addComponents(button1, button2)
    const row2 = new MessageActionRow().addComponents(button1)
    const row3 = new MessageActionRow().addComponents(button2)
    let msg = await interaction.reply({ content: `${t('commands:divorce.confirm')}`, components: [row], fetchReply: true, ephemeral: true})

    const filter = user => user
    const collector = msg.createMessageComponentCollector({ filter: filter, time: 120000 })

    collector.on("collect", async (i) => {
        if(i.customId === 'aseitar') {
            if(i.user !== interaction.user) return i.reply({ content: `${t('errors:noperm.button')}`, ephemeral: true})
            await pushMarryForUsers(user.id, 'solteiro', interaction.user.id, Date.now())
            await pushMarryForUsers(interaction.user.id, 'solteiro', user.id, Date.now())

            button2.setLabel(`${t('buttons:divorce.ok')}`)
            button2.setDisabled(true)
            i.update({ components: [row3], ephemeral: true })
        } else if(i.customId === 'recusar') {
            button1.setLabel(`${t('buttons:divorce.nook')}`)
            button1.setDisabled(true)
            i.update({ components: [row2], ephemeral: true })
        }
    })

}


async function pushMarryForUsers (user, status, marida, time) {
    const data = await User.findOne({ user: user})
    data.profile.marry.status = status
    data.profile.marry.parent = marida
    data.profile.marry.time = time
    data.badges.remove('<:fp_love:1000171194038890566>')
    data.save()
}


