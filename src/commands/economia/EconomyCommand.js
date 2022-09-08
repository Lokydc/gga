const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'economy',
            name_localizations: {"pt-BR": "economia"},
            description: '[🪙 ECONOMIA ] Sistema de economia simples.',
            options: [
                {
                    
                    type: 'SUB_COMMAND',
                    name: 'daily',
                    description: '[🪙 ECONOMY ] Get daily caramels.',
                    description_localizations: {"pt-BR": "[🪙 ECONOMIA ] Pegue caramelos diários."}
                },
                {
                    type: 'SUB_COMMAND',
                    name: 'top',
                    description: '[🪙 ECONOMY ] See the list of caramels',
                    description_localizations: {"pt-BR": "[🪙 ECONOMIA ] Veja a lista de caramelos"},
                    options: [
                        {
                            type: 'NUMBER',
                            name: 'page',
                            description: 'Qual é a pagina?',
                            required: false,
                            maxValue: 2,
                            minValue: 1
                        }
                    ]
                },
{
                    
    type: 'SUB_COMMAND',
    name: 'pay',
    name_localizations: {"pt-BR": "pagar"},
    description: '[🪙 ECONOMY ] Pay users or donate to the poor.',
    description_localizations: {"pt-BR": "[🪙 ECONOMIA ] Pague usuários ou doe para pobres."},
    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'Qual usuário você quer pagar?',
            required: true
        },
        {
            type: 'NUMBER',
            name: 'value',
            description: 'Qual o valor?',
            minValue: 10,
            required: true
        }
    ]
},
{
                    
    type: 'SUB_COMMAND',
    name: 'view',
    name_localizations: {"pt-BR": "ver"},
    description: '[🪙 ECONOMY ] See how many caramels you have',
    description_localizations: {"pt-BR": "[🪙 ECONOMIA ] Veja quantos caramelos você tem"},
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
    name: 'cooldowns',
    description: '[ 🪙 ECONOMY ] See your times for using certain commands!',
    description_localizations: {"pt-BR": "[🪙 ECONOMIA ] Veja seus tempos para usar certos comandos!"}
},
{
    type: 'SUB_COMMAND',
    name: 'coinflip',
    name_localizations: {"pt-BR": "girarmoeda"},
    description: '[ 🪙 ECONOMY ] Bet with your friends.',
    description_localizations: {"pt-BR": "[ 🪙 ECONOMIA ] Aposte com seus amigos."},
    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'usuário para apostar',
            required: true
        },
        {
            type: 'NUMBER',
            name: 'value',
            description: 'valor do coinflip',
            maxValue: 500000000,
            minValue: 1000,
            required: true
        }
            ]
}
            ]
        })
    }

    run = async (interaction, t) => {
        const subCommand = interaction.options.getSubcommand()
        require(`../../subCommands/economy/${subCommand}`)(this.client, interaction, t)
    }
}

