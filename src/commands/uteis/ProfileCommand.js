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
            name: 'profile',
            name_localizations: {"pt-BR": "perfil"},
            description: '[✨ PROFILE ] View profile information.',
            description_localizations: {"pt-BR": "[✨ PROFILE ] Veja as informações do profile"},
            options: [
                {
                    
                    type: 'SUB_COMMAND',
                    name: 'view',
                    name_localizations: {"pt-BR": "ver"},
                    description: '[✨ PROFILE ] See user profile.',
                    description_localizations: {"pt-BR": "[✨ PROFILE ] See user profile."},
                    options: [
                        {
                            type: 'USER',
                            name: 'user',
                            description: 'Qual usuário você quer ver?',
                            required: false
                        }
                    ]
        },
        {
                    
            type: 'SUB_COMMAND',
            name: 'aboutme',
            name_localizations: {"pt-BR": "sobremim"},
            description: '[✨ PROFILE ] change your about me!',
            description_localizations: {"pt-BR": "[✨ PROFILE ] - Mude seu sobre mim"},
            options: [
                {
                    type: 'STRING',
                    name: 'text',
                    description: 'Escreva algo fofo, ok?',
                    required: true
                }
            ]
},
{
                    
    type: 'SUB_COMMAND',
    name: 'background',
    description: '[✨ PROFILE ] edit/buy your backgrounds!',
    description_localizations: {"pt-BR":"[✨ PROFILE ] edit/buy seus backgrounds"}
},
{
                    
    type: 'SUB_COMMAND',
    name: 'marry',
    name_localizations: {"pt-BR": "casar"},
    description: '[✨ PROFILE ] Marry your crush, or get rejected',
    description_localizations: {"pt-BR": "[✨ PROFILE ] Case com seu crush, ou seja rejeitado"},
    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'Quem é @ sortud@ ?',
            required: true
        }
    ]
},
{
                    
    type: 'SUB_COMMAND',
    name: 'divorce',
    name_localizations: {"pt-BR": "divorciar"},
    description: '[✨ PROFILE ] Divorce a love that didn\'t work out',
    description_localizations: {"pt-BR": "[✨ PROFILE ] Divorcie um amor que não deu certo"}
}
            ]
        })
    }

    run = async (interaction, t) => {
        const subCommand = interaction.options.getSubcommand()
        require(`../../subCommands/profile/${subCommand}`)(this.client, interaction, t)
    }
}