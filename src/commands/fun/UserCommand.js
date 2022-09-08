
const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'user',
            description: 'user, simples',
            options: [
                {
                    
                            type: 'SUB_COMMAND',
                            name: 'avatar',
                            description: '[ 👤 USER ] See user avatar',
                            description_localizations: {"pt-BR": "[ 👤 USER ] Veja o avatar o usuário"},
                            options: [
                                {
                                    type: 'USER',
                                    name: 'user',
                                    description: 'Usuário que você quer ver o avatar',
                                    required: false
                                }
                            ]
                },
        {
                    
            type: 'SUB_COMMAND',
            name: 'info',
            description: '[ 👤 USER ] View a user\'s information.',
            description_localizations: {"pt-BR": "[ 👤 USER ] Veja as informações de um usuário."},
            options: [
                {
                    type: 'USER',
                    name: 'user',
                    description: 'Qual usuário que você quer ver as informações?',
                    required: false
                }
            ]
},
{
                    
    type: 'SUB_COMMAND',
    name: 'banner',
    description: '[ 👤 USER ] View a user\'s banner',
    description_localizations: {"pt-BR": "[ 👤 USER ] Veja o banner de um usuário"},
    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'Qual usuário que você quer ver o banner?',
            required: false
        }
    ]
}
                
            ]
        })
    }

    run = (interaction, t) => {
        const subCommand = interaction.options.getSubcommand()
        const user = interaction.options.getUser('user') || interaction.user

        require(`../../subCommands/user/${subCommand}`)(this.client, interaction, user, t)
    }
}