const Event = require('../../structures/Event')
const { AuditLOG } = require('../../../packages/Webhook')
const Guild = require('../../database/Schemas/Guild')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'channelCreate'
        })
    }

    run = async (channel) => {
        const guild = await Guild.findOne({ server: channel.guildId})
        const t = this.client.guilds.cache.get(channel.guildId)
        if(guild) {
        const log = new AuditLOG(guild, this.client, t)
        const types = {
            GUILD_TEXT: 'Texto',
            GUILD_VOICE: 'Voz',
            GUILD_CATEGORY: 'Categoria',
            GUILD_NEWS: 'News',
            GUILD_STORE: 'Loja',
            GUILD_PUBLIC_THREAD: 'thread pública',
            GUILD_PRIVATE_THREAD: 'thread privada',
            GUILD_STAGE_VOICE: 'Palco',
            GUILD_DIRECTORY: 'Diretório'
        }

        log.send({title: 'Canal criado!', description: `**__Tipo:__** ${types[channel.type] ? types[channel.type] : 'unknown'}\n**__Nome:__** ${channel.name} (${channel.id})\n**__Tópico:__** ${channel.topic ? channel.topic : 'Ser feliz'}\n**__Criação:__** <t:${~~(channel.createdAt / 1000)}>`, color: 'GREEN'})
        }

    }
}