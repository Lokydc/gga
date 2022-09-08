
const User = require('../../src/database/Schemas/User')
const Discord = require('discord.js')

class Blacklist {

  static async add(i, user, plan) {
      if(!user) return console.error("Você precisa definir o user!")

      const usuar = await User.findOne({ 
          user: user.id
    })

    if(usuar.status.premium.status === true) return i.update({ content: 'O Usuário já é premium', components: [], embeds: [],ephemeral: true})
    usuar.status.premium.status = true
    usuar.status.premium.type = plan

    await usuar.save()

    return i.update({ content: `O Usuário ${user.username} virou premium!`, components: [], embeds: [], ephemeral: true})
  }

  static async remove(i, user) {
    if(!user) return console.error("Você precisa definir o user!")

    const usuari = await User.findOne({ 
        user: user.id
  })

  //if(!usuari) return i.update({ content: 'Usuário não esta na minha database!', components: [], ephemeral: true})
  if(usuari.status.premium.status === false) return i.update({ content: 'O Usuário não é premium!', embeds: [],components: [], ephemeral: true})

  usuari.status.premium.status = false

  
  await usuari.save()

  return i.update({ content: `O Usuário ${user.username} foi retidado da minha lista de premium!`, components: [], embeds: [], ephemeral: true})
}

}

module.exports = Blacklist;