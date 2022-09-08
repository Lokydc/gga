const User = require('../../src/database/Schemas/User')
const Discord = require('discord.js')

class Blacklist {

  static async add(i, user) {
      if(!user) return console.error("Você precisa definir o user!")

      const usuar = await User.findOne({ 
          user: user.id
    })

    if(!usuar) return i.update({ content: 'Usuário não esta na minha database!', components: [], ephemeral: true})
    if(usuar.status.staff.perm === true) return i.update({ content: 'O Usuário já é admin', components: [], ephemeral: true})
    usuar.status.staff.perm = true

          
    let embedadd = new Discord.MessageEmbed()
    .setTitle('Você virou admin, parabéns!')
    .setDescription(`**__Funcionalidades:__** usar o comando \`/blacklist\` ( caso banir um usuário sem motivo , vc que será banido! )`)
    
    
usuar.save()

    return i.update({ content: `O Usuário ${user.username} virou admin!`, components: [], ephemeral: true})
  }

  static async remove(i, user) {
    if(!user) return console.error("Você precisa definir o user!")

    const usuari = await User.findOne({ 
        user: user.id
  })

  if(!usuari) return i.update({ content: 'Usuário não esta na minha database!', components: [], ephemeral: true})
  if(usuari.status.staff.perm === false) return i.update({ content: 'O Usuário não é admin!', components: [], ephemeral: true})

  usuari.status.staff.perm = false

  let embedremove = new Discord.MessageEmbed()
        .setTitle('Você não é admin!')
        .setDescription(`O nãoexisto#6702 te removeu da lista de admins meus!\nAgora você perdeu as funcionalidades admin.`)
    

  usuari.save()

  return i.update({ content: `O Usuário ${user.username} foi retidado da minha lista de admins!`, components: [], ephemeral: true})
}

}

module.exports = Blacklist;