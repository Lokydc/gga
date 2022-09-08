const Event = require('../../structures/Event')
const Guild = require('../../database/Schemas/Guild')
const Discord = require('discord.js')
module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildCreate'
        })
    }

    run = async (guild) => {

        let whitelist = ["1002415489349324850", "1009599123156123689", "967120262510297138"]

        if(whitelist.includes(guild.id)) return;
        if(guild.memberCount < 10) return guild.leave()

        let bots = guild.members.cache.filter(m => m.user.bot).size
        let membros = guild.members.cache.filter(m => m.user.bot === false).size
        if(bots > membros) return guild.leave()
        let guild_verify = await Guild.findOne({
            server: guild.id
        });

        if(!guild_verify) {
            let newData = new Guild({
                server: guild.id,
            })
            newData.save();
        }
        
    }
}
