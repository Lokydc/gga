const Discord = require("discord.js")
const Command = require('../../structures/Command')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const a = require('../../../packages/get')
const Topgg = require("@top-gg/sdk")
const topgg = new Topgg.Api('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3MDEzNDA5MDE1MjAzNDM1NCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjYyMTY3NzQyfQ.amSMoWpq0mkvXXXNbgABnfmoxdVcMrYJMEdEmIdV6B8')
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'vote',
            name_localizations: {"pt-BR": "votar"},
            description: '[ 💁‍♂️ VOTE ] - Vote na jujuba e ajude a crescer!',
            description_localizations: {"en-US":"[ 💁‍♂️ VOTE ] - Vote for the bot and contribute!"}
        })
    }

    run = async (interaction, t) => {
        let vote = await topgg.hasVoted(`${interaction.user.id}`)

        const button = new MessageButton()
        .setLabel('Top.gg')
        .setEmoji('<:topgg:1015432787890815090>')
        if(!vote) {
        button.setURL(`https://top.gg/bot/${this.client.user.id}`) 
        button.setStyle('LINK')
        }
        if(vote) {
            button.setLabel(`${t('buttons:vote.voted')}`)
            button.setStyle('SUCCESS')
            button.setDisabled(true)
            button.setCustomId("true")
        }

        const row = new MessageActionRow().addComponents(button)

        interaction.reply({ content: `${t('commands:vote.app')}`, components: [row]})
}
}