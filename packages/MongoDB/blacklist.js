const User = require('../../src/database/Schemas/User')
const Discord = require('discord.js')

class Blacklist {

  static async add(admin, i, user) {
      if(!user) return console.error("Você precisa definir o user!")

      const usuar = await User.findOne({ 
          user: user.id
    })

    if(!usuar) return i.update({ content: 'Usuário não esta na minha database!', components: [], ephemeral: true})
    if(usuar.status.blacklist.status === true) return i.update({ content: 'O Usuário já está banido!', components: [], ephemeral: true})
    usuar.status.blacklist.status = true

          
    let embedadd = new Discord.MessageEmbed()
    .setTitle('Você foi banido!')
    .setDescription(`🛡️ **__Admin:__** ${admin.tag}`)
try{
    user.send({
    embeds: [embedadd]
})
} catch(err) {
    consoloe.log(`O Usuário ${user.tag} foi banido por ${admin.tag} , mas eu nao consegui avisa-lo`)
}

    await usuar.save()

    return i.update({ content: `O Usuário ${user.username} agora está banido, e foi adicionado em minha blacklist!`, components: [], ephemeral: true})
  }

  static async remove(admin, i, user) {
    if(!user) return console.error("Você precisa definir o user!")

    const usuari = await User.findOne({ 
        user: user.id
  })

  if(!usuari) return i.update({ content: 'Usuário não esta na minha database!', components: [], ephemeral: true})
  if(usuari.status.blacklist.status === false) return i.update({ content: 'O Usuário não está banido!', components: [], ephemeral: true})

  usuari.status.blacklist.status = false

  let embedremove = new Discord.MessageEmbed()
        .setTitle('Você foi desbanido!')
        .setDescription(`🛡️ **__Admin:__** ${admin.tag}`)
    try{
        user.send({
        embeds: [embedremove]
    })
    } catch (err) {
        consoloe.log(`O Usuário ${user.tag} foi desbanido por ${admin.tag} , mas eu nao consegui avisa-lo`)
    }

  await usuari.save()

  return i.update({ content: `O Usuário ${user.username} agora está desbanido, e foi retirado da minha blacklist!`, components: [], ephemeral: true})
}

}

module.exports = Blacklist;