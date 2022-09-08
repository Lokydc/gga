const { MessageEmbed } = require('discord.js')

const ban = (user, staff, coins, reason, time) => {
    const embed = new MessageEmbed()
    .setTitle(`<:bmo_howdy:1000167902126805042> Nova prisão!`)
    .setColor('DARK_VIVID_PINK')
    .setFields(
        {
            name: `<:members1:1002960272484470844> Usuário`,
            value: `${user.username} (\`${user.id}\`)`,
            inline: false
        },
        {
            name: `<:server_owner:1002991941081907280> Staff`,
            value: `${staff.username} (\`${staff.id}\`)`,
            inline: false
        },
        {
            name: `<:Icon_ChannelText:1002966100989980702> Motivo`,
            value: `\`${reason}\``,
            inline: false
        },
        {
            name: `:timer: Tempo`,
            value: `${time}`,
            inline: false
        },
        {
            name: ':watch: Horário',
            value: `<t:${~~(Date.now() / 1000)}>`,
            inline: false
        }
    )

    return embed
}

module.exports = {
    ban
}