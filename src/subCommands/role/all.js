const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const sexo = require('moment')
const Guild = require('../../database/Schemas/Guild')
module.exports = async (client, interaction, t) => {
    const role = interaction.options.getRole('role')
    const type = interaction.options.getString('type') || 'membro'
    const option = interaction.options.getString('option')

    let data = await Guild.findOne({ server: interaction.guild.id })

    if(data.games.akinator.status === true) return interaction.reply({ content: `${t('commands:role.ad')}`, ephemeral: true})
    if(role.managed) return interaction.reply({ content: `${t('commands:role.manage')}`, ephemeral: true})
    if(role.id === interaction.guild.id) return interaction.reply({ content: `${t('commands:role.everyone')}`, ephemeral: true})

    if (role.position >= interaction.member.roles.highest.position && interaction.guild.ownerId !== interaction.user.id) return interaction.reply({ content: `${t('commands:role.position')}`, ephemeral: true})
    if (interaction.guild.me.roles.highest.position <= role.position) return interaction.reply({ content: `${t('commands:role.my')}`, ephemeral: true })


    const button = new MessageButton()
    .setLabel(`${t('buttons:role.cancel')}`)
    .setCustomId('cancelar')
    .setStyle('DANGER')

    const row = new MessageActionRow().addComponents(button)

    let array = []

    let enviado = 0
    let membros = 0
    let bots = interaction.guild.members.cache.filter(member => member.user.bot === true).size
    let users = interaction.guild.members.cache.filter(member => member.user.bot !== true).size
    console.log(`${bots} , ${users}`)

    let timerD = type === 'bot' ? bots : users

    let tim = ~~(((timerD * 5) % 3600) /60)
    let ime = 'minutos'
    if(tim === 1) ime = 'minuto'
    if(tim === 0) {
        tim = ~~(((timerD * 5) %3600) %60)
        ime = 'segundos'
    }

    let tempoTo = `${tim} ${ime}`


    let msg = await interaction.reply({ content: `${t('commands:role.wait', {type: type, role: role, tempo: tempoTo})}`, components: [row], ephemeral: true, fetchReply: true})

    let filter = user => user
    const collector = msg.createMessageComponentCollector({ filter: filter, time: 180000})

    collector.on('collect', (i) => {
            i.update({ content: `${t('commands:role.cancelado', { users: sended(), role: role})}`, components: []}).catch(() => {})
            parar()
    })

    data.games.akinator.status = true
    data.save()
    await interaction.guild.members.cache.forEach((member) => {
        if(!member.user.bot && type !== 'bot') {
            array.push(member.id)
            membros++
        } else if(member.user.bot) {
            array.push(member.id)
            membros++
        }
    })
    
    let send = 0
    let i = 0
    let inter = false

    let id = setInterval(() => {
        if(enviado === membros && inter !== true) {
            inter = true
            parar()
            interaction.editReply({ content: `${t('commands:role.ok', {type: type, role: role, send: send})}`, ephemeral: true}).catch(() => {})
            data.games.akinator.status = false
            data.save()
        } else {
            let user = interaction.guild.members.cache.get(array[i])
            if(user) {
                user.roles[option](role.id).then(() => {
                    enviado++
                    send++
                    i++
                }).catch(() => {
                    i++
                    enviado++
                })
            }
        }
    }, 5000)

    function parar() {
        pararD(id)
    }

    function sended() {
        return send
    }
    
}

function pararD(id) {
    clearInterval(id)
}

