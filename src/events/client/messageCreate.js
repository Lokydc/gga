const Discord = require("discord.js");
const Event = require('../../structures/Event')
const Guild = require('../../database/Schemas/Guild')
const shell = require('shelljs');
const bot = require('../../../index')
module.exports = class extends Event {

   constructor(client) {

        super(client, {

            name: 'messageCreate'

        })

    }

    run = async (message) => {
    if(message.channel.type !== 'GUILD_TEXT') return;
    let arr = [
        `<@${this.client.user.id}>`,
        `<@!${this.client.user.id}>`
    ]
    if(arr.includes(message.content)) return getResponse(message, this.client)
  }

} 

async function getResponse(message, client) {
    

        let button = new Discord.MessageButton()
        .setLabel('Invite Me!')
        .setStyle('LINK')
        .setURL(`https://top.gg/bot/${client.user.id}`)

        let button2 = new Discord.MessageButton()
        .setLabel('How to use?')
        .setStyle('PRIMARY')
        .setCustomId('config')

        let cc = `**Commands:**\n`

        bot.client.commands.forEach(async (cmd) => {
            cc += ` \`${cmd.name}\` `
        })

        let row = new Discord.MessageActionRow().addComponents(button, button2)
        let embed = new Discord.MessageEmbed()
        .setDescription(`<:pb_attaboi:1000167758564167702> I'm available at [Slash Commands](https://support.discord.com/hc/pt-br/articles/1500000368501-Slash-Commands-FAQ), use </help:1016915372768755742>!\n\n${cc}`)
        .setColor('DARK_VIVID_PINK')
        .setFooter({ iconURL: client.users.cache.get('947856944515936306').displayAvatarURL({ size: 128}), text: `By ${client.users.cache.get('947856944515936306').tag}`})
        return message.reply({ content: `:flag_br: É possível mudar meu idioma usando o comando </language:1016913838303613031>\n:flag_us:  Is it possible to change my language using the command </language:1016913838303613031>`,embeds: [embed], components: [row]}).then((msg) => {

            const filter = user => user
            const collector = msg.createMessageComponentCollector({ filter: filter, time: 60000})

            collector.on('collect', (i) => {
                i.reply({ files: ['https://assets-global.website-files.com/5f9072399b2640f14d6a2bf4/628572088b1d3cf52023fc2a_11111_command-picker.png'], ephemeral: true })
            })
            setTimeout(() => {
                msg.delete()
            }, 60000)
        })
    
}

