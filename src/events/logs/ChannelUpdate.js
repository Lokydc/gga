const Event = require('../../structures/Event')
const { AuditLOG } = require('../../../packages/Webhook')
const Guild = require('../../database/Schemas/Guild')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'channelUpdate'
        })
    }

    run = async (oldChannel, newChannel) => {
        const guild = await Guild.findOne({ server: newChannel.guildId})
        const t = this.client.guilds.cache.get(newChannel.guildId)
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

        if(oldChannel.type !== newChannel.type) log.send({title: 'Canal editado!', description: `**__Nome:__** ${newChannel.name} (${newChannel.id})\n**__Tipo:__** ${types[oldChannel.type] ? types[oldChannel.type] : 'unknown'} => ${types[newChannel.type] ? types[newChannel.type] : 'unknown'}`, color: 'BLUE'})
        
        }

    }
}