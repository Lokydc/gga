const Event = require('../../structures/Event')
const c = require('colors')
const { Client } = require("cherry-payments");
const config = require('../../../config.json')
const a = require('../../../packages/banEmbed')
const Guild = require('../../database/Schemas/Guild')
module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async () => {
        this.client.registryCommands()
        this.client.user.setStatus("online")

        const dbIndex = require("../../database/index");
        dbIndex.start();

        this.client.guilds.cache.forEach(async (guild) => {
            this.client.user.setActivity(`Adventure Time! Cluster ${this.client.cluster.id} [${guild.shardId}]`, { type: "PLAYING", shardId: guild.shardId })

            let data = await Guild.findOne({ server: guild.id })
                if(data) {
                if(data.games.akinator.status === true) {
                    console.log(`Role all do servidor ${guild.name} (${guild.id}) foi resetado!`)
                    data.games.akinator.status = false
                    data.save().catch(() => {})
                }
                }
        })

        setInterval(() => {
            this.client.guilds.cache.forEach((guild) => {
                this.client.user.setActivity(`Adventure Time! Cluster ${this.client.cluster.id} [${guild.shardId}]`, { type: "PLAYING", shardId: guild.shardId })
            })
        }, 20 * 60000)

        /*

        let channel = this.client.channels.cache.get('1015100170796539964')

        let banido = {
            id: "389089969911889920",
            username: 'konima'
        }
        let staff = {
            id: "947856944515936306",
            username: 'ᵠᵈʷBonnibel#8382' 
        }
        const embedss = a.ban(banido, staff, 1000, `Uso de programas de terceiros para obter vantagens no /economy`, 'permanente')

        if(channel) {
            channel.send({ embeds: [embedss]})
        }
        */

    }
}