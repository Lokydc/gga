const Event = require('../../structures/Event')
const c = require('colors')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'shardReady'
        })
    }

    run = async (id) => {
        console.log(c.green(`Shard ${id} online em ${this.client.guilds.cache.size} servers com ${this.client.users.cache.size} users em ${this.client.channels.cache.size} channels`))
       /* const web = this.client.guilds.cache.get('974585001486221332')

        let embed = new Discord.MessageEmbed()
        .setDescription(`Cluster \`${id + 1}\` iniciada com sucesso em ${this.client.guilds.cache.size} servidores com ${this.client.users.cache.size} usuários`)
        web.send({ embeds: [embed]})*/
    }//https://discord.com/api/webhooks//
}