const Discord = require("discord.js")
const Command = require('../structures/Command')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const a = require('../../packages/get')
const sexo = require('moment')
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'sexo',
            description: 'teste sla oq bla bla bla'
        })
    }

    run = async (interaction) => {

       let terminar = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
        .setCustomId("terminar")
        .setLabel("Finalizar")
        .setStyle("DANGER")
       )

       let inicio = Date.now()
       let seconds = 0

       const int = setInterval(() => {
        seconds++
       }, 1000)
 
       let embed = new Discord.MessageEmbed()
       .setTitle("Ponto iniciado")
       .addFields({name: `Qra do Agente👮:`, value: `${interaction.user.username}`, inline: false },{name:`Horário de entrada :`, value:  `<t:${~~(inicio / 1000)}> (<t:${~~(inicio / 1000)}:R>)`, inline: true})

       const msg = await interaction.reply({embeds: [embed], components: [terminar], fetchReply: true})


       const collector = msg.createMessageComponentCollector({ filter: user => user });
 
       collector.on('collect', async(i) => {
        console.log('botão coletado')

        console.log(~~(inicio / 1000) - ~~(Date.now() / 1000))

        if(i.user.id !== interaction.user.id) return i.reply({ content: 'Você nao pode usar este botão!', ephemeral: true}) //eu sou uma coruja
 
        if(i.customId === "terminar" ) {
            if(seconds < 2) return i.reply({ content: 'Você precisa pelo menos ficar 2 segundos para poder finalizar', ephemeral: true})
            i.update({ content: 'Finalizado', embeds: [], components: []}) //sexo KKK
            interaction.channel.send({ content: `${interaction.user}\nInicio: <t:${~~(inicio / 1000)}>\nSaída: <t:${~~(Date.now() / 1000)}>\nTotal: \`${seconds} segundos\``, embeds: [], components: []})
            clearInterval(int) //apagar meus 2000 comentarios ne kkk
        } // esperar os módulos dela ligar
       }) //net boa
}
}