//<:bitcoin:970521426224353321>

const Command = require('../../structures/Command')
const User = require('../../database/Schemas/User')
const bitcoin = require('../../../packages/economy')
const Utils = require("../../util/Util")
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = async (client, interaction, t) => {   
    const user = interaction.options.getUser('user')
    const value = interaction.options.getNumber('value')
    
    
    const coinsV = await bitcoin.view(user)
    const coinsU = await bitcoin.view(interaction.user)
    const usuar = await User.findOne({
        user: interaction.user.id
    })

    if(!coinsV) return interaction.reply({ content: `${t('commands:coinflip.nocaramels')}`, ephemeral: true})
    
     if(value > coinsV.normal ) return interaction.reply({ content: `${t('commands:coinflip.nocaramels')}`, ephemeral: true})
     if(user.id === interaction.user.id) return interaction.reply({ content: `${t('commands:coinflip.bug')}`, ephemeral: true})
     if(value > coinsU.normal) return interaction.reply({ content: `${t('commands:coinflip.nocaramels')}`, ephemeral: true })

     if(user.bot) {
        interaction.reply({ content: 'bots :x:'})
       } else {
        const button = new MessageButton()
        .setCustomId('primary')
        .setEmoji('✅')
        .setStyle('PRIMARY')

        const row = new MessageActionRow().addComponents(button)

        let reward = Utils.toAbbrev(Math.floor(value - value/100 * 3))
        let valo = Utils.toAbbrev(value)
        let taxa = Math.floor(value/100 * 3)
        interaction.reply({
             content: `${t('commands:coinflip.confirm', { user: user, author: interaction.user, taxa: taxa, value: valo, reward: reward})}`,
             components: [row]
         })
         
         
         const filter = i => i.customId === 'primary' && i.user.id === user.id;
         const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

collector.on('collect', async i => {
	if (i.customId === 'primary') {
            let lados = ["cara", "coroa"];
            let resposta = lados[Math.floor(Math.random() * lados.length)];
            if(resposta === 'cara') {
            bitcoin.add(interaction.user, value)
            bitcoin.remove(user, value)

            let reward = Utils.toAbbrev(Math.floor(value))
            await i.update({ content: `${t('commands:coinflip.youreward', {value: reward, author: interaction.user, user: user })}`, components: [] }); //968570313027780638
        } else
            if(resposta === 'coroa') {
            let valo = Utils.toAbbrev(Math.floor(value))
            bitcoin.add(interaction.user, value)
            bitcoin.remove(user, value)
            await i.update({ content: `${t('commands:coinflip.userreward', {author: interaction.user, value: valo, user: user})}`, components: [] });
        }
	}
});
       }
     }
    
