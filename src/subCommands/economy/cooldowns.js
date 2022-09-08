const Discord = require("discord.js")
const Command = require('../../structures/Command')
const db = require('discord-mongo-currency')
const User = require('../../database/Schemas/User')
const Utils = require("../../util/Util")
const ms = require("pretty-ms")
const cooldowns = {}

module.exports = async (client, interaction, t) => {
        
        //interaction.channel.sendTyping()

        let user = await User.findOne({ user: interaction.user.id })
        let timeout = 86400000
        let daily = user.profile.daily.time
        let rep = user.profile.reps.time
        //let minerar1 = ms(timeout - (Date.now() - minerar));
        let daily1 = ms(timeout - (Date.now() - daily));
        let rep1 = ms(timeout - (Date.now() - rep));


        if(daily !== null && timeout - (Date.now() - daily) <= 0) {
         daily1 = '✅'
        }
        if(rep !== null && timeout - (Date.now() - rep) <= 0) {
         rep1 = '✅'
			}
            
            let embed = new Discord.MessageEmbed()
            .setDescription(`**__/economy daily:__** | \`${daily1}\`\n**__/profile reputation__** | \`${rep1}\``)
            .setColor('GREEN')

            interaction.reply({ embeds: [embed]})

  


    }