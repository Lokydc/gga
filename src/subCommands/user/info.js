//https://cdn.discordapp.com/guilds/${interaction.guildId}/users/${member.user.id}/avatars/${member.avatar}.png?size=4096
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const a = require('../../../packages/get')

module.exports = async (client, interaction, membro, t) => {
    let user = interaction.guild.members.cache.get(membro.id)

    let user2 = await a.getUser(membro.id, client.token)

    if(user2 && !user) {

    const button = new MessageButton()
    .setLabel('Banner')
    .setStyle('PRIMARY')
    .setEmoji('<:marceline_yay:1000167724800024596>')
    .setCustomId('avatar')

    if(!user2.avatar) button.setDisabled(true)

    let avatarURL = `https://cdn.discordapp.com/avatars/${user2.id}/${user2.avatar ? user2.avatar : 'undefined'}.${user2?.avatar?.substring(0,2) === "a_" ? "gif" : "png"}?size=1024`
    let bannerURL = `https://cdn.discordapp.com/banners/${user2.id}/${user2.banner ? user2.banner : 'undefined'}.${user2?.banner?.substring(0,2) === "a_" ? "gif" : "png"}?size=512`

    if(bannerURL.includes('undefined')) {
        button.setDisabled(true)
        button.setLabel(`${t('buttons:info.nobanner')}`)
        button.setStyle('DANGER')
        button.setEmoji("<:bmo_howdy:1000167902126805042>")
    }

    const row = new MessageActionRow().addComponents(button)
    const embed = new MessageEmbed()
    .setColor(user2.accent_color ? user2.accent_color : 'DARK_VIVID_PINK')
    .setTitle(`**${t('commands:info.information')} ${user2.username}#${user2.discriminator}**`)
    .setThumbnail(avatarURL)
    .setDescription(`${t('commands:info.description', {id: user.id, create: `<t:${~~(membro.createdAt / 1000)}> (<t:${~~(membro.createdAt / 1000)}:R>`})}`)
    let msg = await interaction.reply({embeds: [embed], components: [row], fetchReply: true, ephemeral: true})

    let filter = user => user
    const collector = msg.createMessageComponentCollector({ filter: filter, time: 60000})

    collector.on('collect', async (i) => {
        //if(i.user.id !== interaction.user.id) return i.reply({ content: 'Sai daqui, isso não é pra você!'})
        let embedPerms = new MessageEmbed()
        .setTitle(user2.username + "#" + user2.discriminator)
        .setColor(user2.accent_color ? user2.accent_color : 'DARK_VIVID_PINK')
        .setImage(bannerURL)
        i.reply({ embeds: [embedPerms], ephemeral: true})

        
    })
    } else if(user) {
    let roles = await getRoles(user)
    let id = user.id

    let bannerURL = `https://cdn.discordapp.com/banners/${user2.id}/${user2.banner ? user2.banner : 'undefined'}.${user2?.banner?.substring(0,2) === "a_" ? "gif" : "png"}?size=512`

    const button = new MessageButton()
    .setLabel(`${t('buttons:info.rolespp')}`)
    .setStyle('PRIMARY')
    .setEmoji('<:roleicon:1002961355923533844>')
    .setCustomId('permissionsuser')

    const button2 = new MessageButton()
    .setLabel('Banner')
    .setStyle('PRIMARY')
    .setEmoji('<:edit:987228412554924073>')
    .setCustomId('banner')

    if(bannerURL.includes('undefined')) {
        button2.setDisabled(true)
        button2.setLabel(`${t('buttons:info.nobanner')}`)
        button2.setStyle('DANGER')
        button2.setEmoji("<:bmo_howdy:1000167902126805042>")
    }

    const row = new MessageActionRow().addComponents(button, button2)

    let high = user.roles.highest.id
    let leng = user._roles.length
    const embed2 = new MessageEmbed()
    .setDescription(`${('commands:info.rolesH', {high: high, leng: leng})}`)
    .setColor('DARK_VIVID_PINK')
    const embed = new MessageEmbed()
    .setColor('DARK_VIVID_PINK')
    .setTitle(`**${t('commands:info.information')} ${user.user.tag}**`)
    .setDescription(`\n**ID:**\`${id}\` (${user.user.bot ? 'Bot' : interaction.guild.ownerId === user.id ? 'Owner' : 'Member'})\n**Conta criada:** <t:${~~(membro.createdAt / 1000)}> (<t:${~~(membro.createdAt / 1000)}:R>)\n**Entrou aqui em:** <t:${~~(user.joinedTimestamp / 1000)}>(<t:${~~(user.joinedTimestamp / 1000)}:R>)`)
    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
    let msg = await interaction.reply({embeds: [embed], components: [row], fetchReply: true, ephemeral: true})
    let filter = user => user
    const collector = msg.createMessageComponentCollector({ filter: filter, time: 120000})

    collector.on('collect', async (i) => {
        //if(i.user.id !== interaction.user.id) return i.reply({ content: 'Sai daqui, isso não é pra você!'})
        if(i.customId === 'permissionsuser') {
            let embedPerms = new MessageEmbed()
        .setTitle(`${t('buttons:info.rolespp')}`)
        .setDescription(`${roles}`)
        .setColor('DARK_VIVID_PINK')
        i.reply({ embeds: [embedPerms, embed2], ephemeral: true})
        } else if(i.customId === "banner") {
        let embedPerms = new MessageEmbed()
        .setImage(bannerURL)
        .setColor('DARK_VIVID_PINK')
        i.reply({ embeds: [embedPerms], ephemeral: true})
        }

        
    })
    }
}

async function getRoles(user) {
    let array = []
    for(let i = 0;i < user._roles.length;i++) {
        array.push(`<@&${user._roles[i]}>`)
    }
    return shorten(array.join(" "), 3996)
}


function shorten(text, len) {
    if (text.length <= len) return text;
    return text.substr(0, len).trim() + "...";
  }
