const Discord = require("discord.js")
const { Permissions } = require('discord.js')
const Command = require('../../structures/Command')
const db = require('discord-mongo-currency')
const Guild = require('../../database/Schemas/Guild')
const Utils = require("../../util/Util")
const ms = require("pretty-ms")
const { AuditLOG } = require('../../../packages/Webhook')
const cooldowns = {}

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            name_localizations: {"pt-BR": "banir"},
            description: '[ ⚙️ MOD ] Ban badly created users!',
            description_localizations: {"pt-BR": "Banir usuários mal criados!"},
            userPerms: ["BAN_MEMBERS"],
            botPerms: ["BAN_MEMBERS"],
            options: [
                {
                    type: 'USER',
                    name: 'user',
                    description: 'Qual usuário deseja banir?',
                    required: true
                },
                {
                    type: 'STRING',
                    name: 'reason',
                    description: 'Qual é o motivo?',
                    required: false
                }
            ],
        }
       
        )
    }

    run = async (interaction, t) => {
        const user = interaction.options.getMember('user')
        const motive = interaction.options.getString('reason') || `${t('commands:punishiment.reason')}`
        if(user.id === interaction.user.id) return interaction.reply({ content: `${t('commands:punishiment.self')}`, ephemeral: true})
        if (user.roles.highest.position >= interaction.member.roles.highest.position && interaction.guild.ownerId !== interaction.user.id) return interaction.reply({ content: `${t('commands:punishiment.high')}`, ephemeral: true})
        if (interaction.guild.me.roles.highest.position <= user.roles.highest.position) return interaction.reply({ content: `${t('commands:punishiment.highbot')}`, ephemeral: true })

        const guild = await Guild.findOne({ server: interaction.guild.id})
        //button
        const button = new Discord.MessageButton().setStyle('PRIMARY').setLabel(`${t('buttons:punishiment.confirm')}`).setCustomId('confirm')
        const row = new Discord.MessageActionRow().addComponents(button)
        let msg = await interaction.reply({ content: `${t('commands:punishiment.confirm', {user: user, motive: motive})}`, components: [row], fetchReply: true})

        const filter = user => user
        const collector = msg.createMessageComponentCollector({ filter: filter, time: 120000})

        collector.on('collect', async (i) => {
            if(i.user !== interaction.user) return i.reply({ content: `${t('errors:noperm.button')}`, ephemeral: true})
            await user.ban({ days: 7, reason: motive})
            i.update({ content: `${t('commands:punishiment.ok')}`, components: []})
            
            //const log = new AuditLOG(guild, this.client, interaction.guild)
            //log.send({title: 'Membro banido', description: `**__Nome:__** ${user.username} (${user.id})\n**__Staff:__** ${interaction.user.username} (${interaction.user.tag})\n**__Motivo:__** ${motive}`, color: 'RED'})
        })
        
    }
}