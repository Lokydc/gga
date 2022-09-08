const Collection = require('../../src/database/Schemas/User')

class Badges {

    static async addBadge(interaction, badge, user) {
        if(!badge) throw new Error('VOCÊ NÃO DEFINIU A PORRA DA BADGE SEU FDP')
        if(!user) throw new Error('VOCÊ ESQUECEU DE DEFINIR O USER OK ?')

        const verificar = await Collection.findOne({ user: user.id})

        if(verificar.badges.includes(badge)) return interaction.reply({ content: 'O Usuário já tem essa badge!', ephemeral: true})

        let array = []

        for(let i = 0;i < verificar.badges.length;i++) {
            if(verificar.badges[i]) {
                array.push(verificar.badges[i])
            }
        }

        array.push(badge)
        verificar.badges = array

        verificar.save()

        return interaction.reply({ content: `${badge} | Você deu uma badge pro usuário ${user.tag}`, ephemeral: true})

    }
}

module.exports = Badges;