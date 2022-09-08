const Command = require('../../structures/Command')
const bitcoin = require('discord-mongo-currency')
const Utils = require("../../util/Util")
const Levels = require("discord-xp");
const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require('discord.js')
const canvacord = require("canvacord");
const User = require('../../database/Schemas/User')


module.exports = async (client, interaction, t) => {
  const args = interaction.options.getString('text')
  const user = await User.findOne({ user: interaction.user.id })
//if(!args) return interaction.reply({ content: 'Você precisa escrever um textinho pro seu sobremim... ', ephemeral: true})
if(!args) {
interaction.reply({ content: `✍️ \`${user.profile.layout.sobremim}\``})
} else {
  if(args.length > 40) return interaction.reply({ content: 'Você só pode digitar até 40 letras!', ephemeral: true })

user.profile.layout.sobremim = args
user.save()
interaction.reply({ content: `:white_check_mark: **| ${t('commands:profile.aboutmeok')}**\n\n\`${args}\``,ephemeral: true})
}
    }
