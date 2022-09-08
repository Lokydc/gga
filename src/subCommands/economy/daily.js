const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const Discord = require("discord.js")
const Command = require('../../structures/Command')
const db = require('../../../packages/economy')
const User = require('../../database/Schemas/User')
const Utils = require("../../util/Util")
const { format } = require('../../../packages/calc')
const ms = require("pretty-ms")
const cooldowns = {}


module.exports = async (client, interaction, t) => {
        
        //interaction.channel.sendTyping()

        let user = await User.findOne({ user: interaction.user.id })
        let timeout = 86400000
        let daily = user.profile.daily.time
        let valor = 3600
        if(user.status.premium.type === 'ouro') valor = 3600 * 2.5
        if(user.status.premium.type === 'bronze') valor = 3600 * 2
        if(user.status.premium.type === 'diamante') valor = 3600 * 3
        let random = Math.floor(Math.random() * valor )


        if(daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        let dailyOff = new MessageEmbed()
        .setTitle('Daily Reward')
        .setColor('#fa05a8')
        .setDescription(`${t('commands:daily.timeout', {time: time})}`)
        
        interaction.reply({embeds: [dailyOff], ephemeral: true}) } else {
            const button = new MessageButton()
    .setLabel(`${t('buttons:daily.reward')}`)
    .setStyle('SUCCESS')
    .setCustomId(`DailyReward${interaction.user.id}`)

    const row = new MessageActionRow().addComponents(button)

        let editado = new MessageEmbed()
        .setTitle('Daily Reward')
        .setDescription(`${t('commands:daily.confirm')}`)
        .setColor('#fa05a8')

        let value = format(random)

        let Rewarded = new MessageEmbed()
        .setDescription(`${t('commands:daily.reedem', {value: value})}`)
        .setColor('#fa05a8')

        let msg = await interaction.reply({ embeds: [editado], components: [row], fetchReply: true})

            const filter = i => i.user.id === interaction.user.id
            const collector = msg.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async (i) => {
                if (i.customId === `DailyReward${interaction.user.id}`) {
                    await db.add(interaction.user, random)
                    user.profile.daily.time = Date.now()
                    user.save()
                    i.update({ embeds: [Rewarded], components: []})
                }
            })
            }
        

    }