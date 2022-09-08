//<:bitcoin:970521426224353321>

const Command = require('../../structures/Command')
const Guild = require('../../database/Schemas/Guild')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const moment = require('moment')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'language',
            description: '[ ⚙️ CONFIG ] Mude minha linguagem padrão.',
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
    if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ content: `${t('commands:lang.nopermission')}`})

    let data = await Guild.findOne({ server: interaction.guild.id })
    if(data.botconfig.language === choice) return interaction.reply({ content: `${t('commands:lang.islang')}`})
    if(choice === 'portuguese') {
        data.botconfig.language = 'portuguese'
        data.save()
        interaction.reply({ content: 'Idioma alterado com sucesso!'})
    } else if(choice === 'english') {
        data.botconfig.language = 'english'
        data.save()
        interaction.reply({ content: 'Language successfully changed!'})
    }
     }
    
}