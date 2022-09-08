const Discord = require("discord.js")
const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'premium',
            name_localizations: {"pt-BR": "vip"},
            description: '[ 💎 PREMIUM ] Buy premium and help the jelly bean grow!',
            options: [
                {
                    type: 'SUB_COMMAND',
                    name: 'buy',
                    name_localizations: {"pt-BR": "comprar"},
                    description: '[ 💎 PREMIUM ] Buy premium and help the jelly bean grow!',
                    description_localizations: {"pt-BR": "[ 💎 VIP ] Compre premium e ajude a jujuba crescer!"}
                }
            ]
        })
    }

    run = async (interaction, t) => {

        const button = new Discord.MessageButton()
        .setLabel('Comprar')
        .setStyle('LINK')
        .setURL('https://discord.gg/T8avBk24U2')

        const row = new Discord.MessageActionRow().addComponents(button)
        const embed = new Discord.MessageEmbed()
        .setDescription(`${t('commands:premium.description')}`)
        .setColor('DARK_VIVID_PINK')

        interaction.reply({ embeds: [embed], components: [row]})
    }
}