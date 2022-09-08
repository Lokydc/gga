//<:bitcoin:970521426224353321>

const Command = require('../../structures/Command')
const Guild = require('../../database/Schemas/Guild')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const moment = require('moment')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'language',
            userPerms: ['ADMINISTRATOR'],
            name_localizations: {"pt-BR": "idioma"},
            description: '[ ⚙️ CONFIG ] Change my language',
            description_localizations: {"pt-BR":"[ ⚙️ CONFIG ] Mude minha linguagem padrão."},
            options: [
                {
                    type: 'STRING',
                    name: 'lang',
                    description: 'selecione uma linguagem',
                    choices: [{
                        name: 'Português',
                        value: 'portuguese'
                    },
                    {
                        name: 'English',
                        value: 'english'
                    }],
                    required: true
        }
            ]
        })
    }

    run = async (interaction, t) => {
    //interaction.channel.sendTyping()
    let choice = interaction.options.getString('lang')

    let data = await Guild.findOne({ server: interaction.guild.id })
    if(data.botconfig.language === choice) return interaction.reply({ content: `${t('commands:lang.islang')}`, ephemeral: true})
    if(choice === 'portuguese') {
        data.botconfig.language = 'portuguese'
        data.save()
        interaction.reply({ content: 'Idioma alterado com sucesso!', ephemeral: true})
    } else if(choice === 'english') {
        data.botconfig.language = 'english'
        data.save()
        interaction.reply({ content: 'Language successfully changed!', ephemeral: true})
    }
     }
    
}