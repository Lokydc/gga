const Discord = require('discord.js')
class AuditLOG {
    constructor(guild, client, server) {
        this.client = client
        this.server = server
        this.channel = guild.webhook.channel ? guild.webhook.channel : 0
        this.token = guild.webhook.token ? guild.webhook.token : undefined
        this.id = guild.webhook.id ? guild.webhook.id : undefined
        this.guild = guild
    }

    async send(log = {title: String, description: String, color: String}) {
        if(this.guild.botconfig.logs.status === false) return;
        if(this.id && this.token) {
        const hook = new Discord.WebhookClient({ token: this.token, id: this.id})

        let embed = new Discord.MessageEmbed()
        .setTitle(log.title)
        .setDescription(log.description)
        .setColor(log.color)
        .setTimestamp()
        if(hook) {
            hook.send({ embeds: [embed]})
        } else {
            let c = this.client.channels.cache.get(this.channel)
            if(c) {
                const o = await this.server.channels.createWebhook(this.channel, 'Jujuba', {
                    avatar: 'https://i.imgur.com/TDwzukE.png',
                    reason: 'Audit Logs webhook'
                  }).catch(console.log('Audit Log failed'))

                  this.guild.webhook.token = o.token
                  this.guild.webhook.id = o.id
                  this.guild.webhook.channel = this.channel
                  this.guild.save()
            }
        }
        }
    }
}

exports.AuditLOG = AuditLOG;