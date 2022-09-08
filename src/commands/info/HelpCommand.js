//https://server-shay444ofc.vercel.app/api/data/

const Command = require('../../structures/Command')
const { MessageEmbed, MessageButton , MessageActionRow} = require('discord.js')
const bot = require('../../../index')
const axios = require('axios')
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            name_localizations: {"pt-BR":"ajuda"},
            description_localizations: {"en-US":"[ ❓ INFO ] - View my commands!"},
            description: '[ ❓ INFO ] - Veja todos os meus comandos!',
            options: [
                {
                    type: 'STRING',
                    name: 'command',
                    description: 'Escolha um comando especifico.',
                    required: false
                }
            ]
        })
    }

    run = async (interaction, t) => {
        let command = interaction.options.getString('command')
        
        if(!command) {

            const button = new MessageButton()
            .setLabel(`${t('buttons:pudim')}`)
            .setStyle('PRIMARY')
            .setDisabled(true)
            .setCustomId('pudim')

            const row = new MessageActionRow().addComponents(button)
            let embed = new MessageEmbed()
            .setAuthor({ name: 'My commands', url: 'https://discord.com/blog/welcome-to-the-new-era-of-discord-apps?ref=badge'})
            .setFields(
                {
                    name: '🪙 Jujuba Economy',
                    value: `\`/economy pay\`, \`/economy daily\`, \`/economy battle\`, \`/economy coinflip\`, \`/economy drop\`, \`/economy view\`, \`/economy top\`, \`/economy cooldowns\``
                },
                {
                    name: '❤️ Jujuba Profile',
                    value: `\`/profile view\`, \`/profile reputation\`, \`/profile aboutme\`, \`/profile background\`, \`/profile marry\`, \`/profile divorce\``
                },
                {
                    name: '⚔️ Jujuba Roleplay',
                    value: `\`/roleplay kiss\`, \`/roleplay slap\`, \`/roleplay dance\`, \`/roleplay hug\``
                },
                {
                    name: '🔰 Jujuba Moderation',
                    value: `\`/role all\`, \`/role giveaway\`, \`/ban\` , \`/kick\``
                },
                {
                    name: '🤣 Jujuba Fun/memes',
                    value: `\`/pokemon view\`, \`/freefire\`, \`/ship\``
                },
                {
                    name: '🍀 Jujuba others',
                    value: `\`/premium buy\`, \`/server info\`, \`/user info\`, \`/vote\`, \`/movie search\``
                }
            )
            .setColor('DARK_VIVID_PINK')

            interaction.reply({ embeds: [embed], components: [row]})
        } else {
            let cmd = bot.client.commands.filter(c => c.name === command)
            let subcommands = `...`
            if(cmd[0]?.options) {
                let sub = cmd[0].options.filter(c => c.type === 'SUB_COMMAND')
            if(sub) {
                let s = sub.map(a => a.name)
                subcommands = `${s}`
            } else {
                subcommands = `...`
            }
            }

            let embed = new MessageEmbed()
            .setTitle(`${cmd[0] ? cmd[0].name : '...'}`)
            .setDescription(`\`${cmd[0] ? cmd[0].description : '...'}\``)
            .setColor('DARK_VIVID_PINK')
            .setFields({
                name: 'Sub commands',
                value: `\`${subcommands ? subcommands : '...'}\``
            })

            interaction.reply({ embeds: [embed]})
        }
    }
}
