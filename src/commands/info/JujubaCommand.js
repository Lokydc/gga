const Command = require('../../structures/Command')
const Discord = require("discord.js");
const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
const ms = require("ms");
const fs = require("fs");
let os = require("os");
let cpuStat = require("cpu-stat");
let pex = ("`") 
let jat = ("**")

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'jujuba',
            description: '[ ❓ INFO ] - See my information.',
            description_localizations: {"pt-BR":"[ ❓ INFO ] - Veja tudo sobre mim"}
        })
    }

    run = async (interaction, t) => {
        //interaction.channel.sendTyping()
        let gg = 0
        let gg2 = 0
        let gg3 = 0
        let test = await this.client.cluster.broadcastEval(`this.guilds.cache.size`)
        let test2 = await this.client.cluster.broadcastEval(`this.users.cache.size`)
        let test3 = await this.client.cluster.broadcastEval(`this.channels.cache.size`)
        for(let i = 0; i < test.length; i++) {
            gg = gg + test[i]
        }
        for(let i = 0; i < test2.length; i++) {
            gg2 = gg2 + test2[i]
        }
        for(let i = 0; i < test3.length; i++) {
            gg3 = gg3 + test3[i]
        }

        let totalGuilds = gg ? gg : 0
        const cliente = this.client.readyAt
        const cei = this.client
        const users = gg2 ? gg2 : 0
        const channels = gg3 ? gg3 : 0
        const ping = this.client.ws.ping
        const svc = os.platform()
        const cpuS = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / 16GB`
          cpuStat.usagePercent(function (err, percent, seconds) {
              const button = new Discord.MessageButton()
              .setLabel('Servidor de suporte')
              .setStyle('LINK')
              .setURL('https://discord.gg/FvXJ3vbKaD')
              
              const button2 = new Discord.MessageButton()
              .setLabel('Me adicione')
              .setStyle('LINK')
              .setURL('https://discord.com/api/oauth2/authorize?client_id=970134090152034354&permissions=671399942&scope=bot%20applications.commands')
              
              
              const button4 = new Discord.MessageButton()
              .setLabel('Source code')
              .setStyle('LINK')
              .setURL('https://github.com/naoexistobb')
              
              const button5 = new Discord.MessageButton()
              .setLabel('Website')
              .setStyle('LINK')
              .setURL('https://jujuba.website/')
              .setDisabled(true)

              let created = ~~(cei.user.createdAt / 1000)
        const row = new Discord.MessageActionRow().addComponents(button2, button, button4)
              const embed = new Discord.MessageEmbed()
              .setAuthor({ name: `${t('commands:jujuba.title')}`, iconURL: cei.user.displayAvatarURL({ size: 128})})
              .setDescription(`${t('commands:jujuba.desc', { users: users, guilds: totalGuilds, created: created})}`)
              .setColor('#F549EF')
              .setFooter({ iconURL: cei.users.cache.get('947856944515936306').displayAvatarURL({ size: 128}), text: `by ${cei.users.cache.get('947856944515936306').tag}`})
              .setThumbnail(cei.user.displayAvatarURL({ size: 128}))
              
              interaction.reply({embeds: [embed], components: [row]})
          })
    }
}