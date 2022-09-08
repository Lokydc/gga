const Discord = require("discord.js")
const Command = require('../../structures/Command')
const db = require('discord-mongo-currency')
const User = require('../../database/Schemas/User')
const Utils = require("../../util/Util")
const ms = require("pretty-ms")
const cooldowns = {}

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'role',
            userPerms: ['MANAGE_ROLES'],
            description: '[ ⚙️ MOD ] Gerencie cargos',
            options: [
                {
                    
                    type: 'SUB_COMMAND',
                    name: 'all',
                    description: '[ ⚙️ MOD ] Update roles for all members!',
                    description_localizations: {"pt-BR":" Atualize cargos de todos os membros!"},
                    options: [
                        {
                            type: 'ROLE',
                            name: 'role',
                            description: 'Qual cargo você quer dar pra todos os membros?',
                            required: true
                        },
                        {
                            type: 'STRING',
                            name: 'option',
                            description: 'Qual o tipo de função?',
                            choices: [{name: 'add', value: 'add'}, {name: 'remove', value: 'remove'}],
                            required: true
                        },
                        {
                            type: 'STRING',
                            name: 'type',
                            description: 'Qual o tipo de membro que você quer dar os cargos? default: membro',
                            choices: [{ name: 'bot', value: 'bot'},{name: 'membro', value: 'membro'}],
                            required: false
                        }
                    ]
                }
            ]
        })
    }

    run = async (interaction, t) => {
        const subCommand = interaction.options.getSubcommand()
        require(`../../subCommands/role/${subCommand}`)(this.client, interaction, t)
    }
}