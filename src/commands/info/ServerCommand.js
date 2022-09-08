const Command = require('../../structures/Command')
const Discord = require("discord.js");
const { version } = require("discord.js");
const fetch = require('axios')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'server',
            name_localizations: {"pt-BR": "servidor"},
            description: '[ 🌐 SERVER ] - View current server information', 
            description_localizations: {"pt-BR":"[ 🌐 SERVER ] - Veja informações sobre servidor atual"},
            options: [
                {
                    type: 'SUB_COMMAND',
                    name: 'info',
                    description: '[ 🌐 SERVER ] - View current server information',
                    description_localizations: {"pt-BR":"[ 🌐 SERVER ] - Veja informações sobre servidor atual"}
                }
            ]
        })
    }

    run = async (interaction) => {

        let tier = {
            TIER_1: "1",
            TIER_2: "2",
            TIER_3: "3"
        }

        let level = tier[interaction.guild.premiumTier] ? `Level ${tier[interaction.guild.premiumTier]}` : "Level 0"
        let bots = interaction.guild.members.cache.filter(m => m.user.bot).size
        let dub = interaction.options.getSubcommand()
        let sus = interaction.guild.members.cache.get(this.client.user.id)
        if(dub === 'info') {
            const button = new Discord.MessageButton()
            .setLabel('Cargos Filosóficos')
            .setCustomId('roles')
            .setStyle('PRIMARY')
            .setEmoji('<:roleicon:1002961355923533844>')
            const row = new Discord.MessageActionRow().addComponents(button)
            let roles = await getRoles(interaction.guild)
            let embed = new Discord.MessageEmbed()
            .setTitle(`${~~(this.client.ws.ping)}ms - ${interaction.guild.name}`)
            .setThumbnail(interaction.guild.iconURL())
            .setColor('DARK_VIVID_PINK')
            .setImage(interaction.guild.bannerURL({ size: 1024 }))
            .addFields(
                {
                    name: '💻 ID',
                    value: `${interaction.guild.id}`,
                    inline: true
                },
                {
                name: '💻 Shard ID',
                value: `${interaction.guild.shardId} - Jujuba Cluster ${this.client.cluster.id} (\`online\`) `,
                inline: true
            },
            {
                name: `<:server_owner:1002991941081907280> ${t('commands:server.owner')}`,
                value: `\`${this.client.users.cache.get(interaction.guild.ownerId).tag}\` (${interaction.guild.ownerId})`,
                inline: true
            },
            {
                name: `<:boosters:1002953198291664916> Booster's`,
                value: `${interaction.guild.premiumSubscriptionCount} | ${level}`,
                inline: true
            },
            {
                name: `<:members1:1002960272484470844> ${t('commands:server.members')} (${interaction.guild.memberCount})`,
                value: `🤖 **Bots (${bots})**`,
                inline: true
            },
            {
                name: `<:Icon_ChannelText:1002966100989980702> ${t('commands:server.channels')} (${interaction.guild.channels.cache.size})`,
                value: `<:voice:1002967057186422825> **${t('commands:server.voice')} (${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size})**\n<:dpc_CanalTexto:1002967553578115072> **${t('commands:server.text')} (${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size})**`,
                inline: true
            },
            {
                name: `<:LNE_verde_join:1002991681542565989> ${t('commands:server.entermy')}`,
                value: `<t:${~~(sus.joinedTimestamp / 1000)}> (<t:${~~(sus.joinedTimestamp / 1000)}:R>)`,
                inline: true
            },
            {
                name: `<:channelcreated:1002992123429273800> ${t('commands:server.created')}`,
                value: `<t:${~~(interaction.guild.createdAt / 1000)}> (<t:${~~(interaction.guild.createdAt / 1000)}:R>)`,
                inline: true
            }
            )

            //\n**Booster's:** 

            let msg = await interaction.reply({ components: [row], embeds: [embed], fetchReply: true, ephemeral: true})

            let filter = user => user
            const collector = msg.createMessageComponentCollector({ filter: filter, time: 120000})

            collector.on('collect', (i) => {
                if(i.customId === 'roles') {
                    let embed = new Discord.MessageEmbed()
                .setTitle(`${t('buttons:info.rolespp')}`)
                .setDescription(`${roles}`)
                .setColor('DARK_VIVID_PINK')

                i.reply({ embeds: [embed], ephemeral: true})
                }
            })
        }

    }
}

async function getRoles(guild) {
    let content = ` `
    guild.roles.cache.forEach((role) => {
        content += `<@&${role.id}>`
    })
    return shorten(content, 3996)
}

function shorten(text, len) {
    if (text.length <= len) return text;
    return text.substr(0, len).trim() + "...";
  }