const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'roleplay',
            description: 'Roleplay , simples',
            options: [
                {
                    
                            type: 'SUB_COMMAND',
                            name: 'kiss',
                            name_localizations: {"pt-BR": "beijar"},
                            description: '[ 😂 FUN ] Kiss your crush or steal a kiss.',
                            description_localizations: {"pt-BR": "[ 😂 FUN ] Beije seu crush ou roube um beijo."},
                            options: [
                                {
                                    type: 'USER',
                                    name: 'user',
                                    description: 'Usuário que você vai beijar.',
                                    required: true
                                }
                            ]
                },
                {
                    
                    type: 'SUB_COMMAND',
                    name: 'dance',
                    name_localizations: {"pt-BR": "dancar"},
                    description: '[ 😂 FUN ] dance with your friends',
                    description_localizations: {"pt-BR": "[ 😂 FUN ] Dance com seus amigos "},
                    options: [
                        {
                            type: 'USER',
                            name: 'user',
                            description: 'Usuário que você vai dançar.',
                            required: true
                        }
                    ]
        },
        {
                    
            type: 'SUB_COMMAND',
            name: 'hug',
            name_localizations: {"pt-BR": "abracar"},
            description: '[ 😂 FUN ] Hug a user who is needy.',
            description_localizations: {"pt-BR": "[ 😂 FUN ] Abrace um usuário carente"},
            options: [
                {
                    type: 'USER',
                    name: 'user',
                    description: 'Usuário que você vai abraçar.',
                    required: true
                }
            ]
},
{
                    
    type: 'SUB_COMMAND',
    name: 'slap',
    name_localizations: {"pt-BR": "bater"},
    description: '[ 😂 FUN ] Slap a user.',
    description_localizations: {"pt-BR": "[ 😂 FUN ] Dê um tapa em um usuário"},
    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'Usuário que você vai bater.',
            required: true
        }
    ]
}
            ]
        })
    }

    run = (interaction, t) => {
        const subCommand = interaction.options.getSubcommand()

        require(`../../subCommands/roleplay/${subCommand}`)(this.client, interaction, t)
    }
}