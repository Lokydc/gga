const Event = require('../../structures/Event')
const Discord = require('discord.js')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'shardError'
        })
    }

    run = async (error, id) => {
        console.log(`Shard ${id} caiu por conta de um erro fatal!`)
    }
}