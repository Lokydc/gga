const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const Discord = require("discord.js")
const Command = require('../../structures/Command')
const Economy = require('../../../packages/economy')
const User = require('../../database/Schemas/User')
const Utils = require("../../util/Util")
const ms = require("pretty-ms")
const cooldowns = {}


module.exports = async (client, interaction, t) => {
    
    const user = interaction.options.getUser('user') || interaction.user;

    const coins = await Economy.view(user)
        if(coins) {
            let caramelos = coins.format
            if(user.id === interaction.user.id) {
                
                interaction.reply({
                    content: `${t('commands:caramelos.author', { caramelos: caramelos})}`,
                    ephemeral: false
                })
            } else {
                interaction.reply({
                    content: `${t('commands:caramelos.user', { user: user, caramelos: caramelos})}`,
                    ephemeral: false
                })
            }
        } else {

                interaction.reply({
                    content: `<:caramelo:974519013642227732> | ${user} tem **0** caramelos!`,
                    ephemeral: false
                })
            
        }
    }