const Card = require('../src/database/Schemas/Card')
const { format } = require('./calc')


const pay = async (user1, user2, value) => {
        let data1 = await Card.findOne({ user: user1.id })
        let data2 = await Card.findOne({ user: user2.id })
        if(!data1) return undefined
        if(!data2) return undefined

        if(data1.caramelos < value) return undefined

        data1.caramelos = data1.caramelos - value
        data2.caramelos = data2.caramelos + value
        await data1.save()
        await data2.save()

        return { success: 'Transação concluída com sucesso!', info: { descont: value - (value * 100) / 2, cvv: data1.cvv}}
    }

const view = async (user) => {
        let data = await Card.findOne({ user: user.id})
        let users = await Card.find({ vip: false }).sort([['caramelos', 'descending']]).exec();
        let position = users.findIndex(i => i.user === user.id) + 1;
        if(data) return { format: String(format(data.caramelos)), normal: data.caramelos, position: position}
        return undefined
    }

const add = async (user, value) => {
        let data = await Card.findOne({ user: user.id})
        if(data) {
            data.caramelos = data.caramelos + value
            data.save()
        } else return { error: "Não foi possivel adicionar"}

        return { success: `Adicionado com sucesso`}
    }

const remove = async (user, value) => {
        let data = await Card.findOne({ user: user.id})

        if(data) {
            data.caramelos = data.caramelos - value
            data.save()
        } else return { error: "Não foi possivel remover"}

        return { success: `Removido com sucesso`}
    }

const newAccount = async (user, guild) => {
        let data = new Card({ 
            user: user.id,
            cvv:  Math.floor(Math.random() * (999 - 111) + 111),
            number: user.id
        })

        await data.save()

        return { success: 'Sucesso ao criar conta', cvv: data.cvv, number: data.number}
    }


    const generateLeaderboard = async (options = { amount, guild}) => {
        if (!options.amount) throw new TypeError("Please provide the amount of users to show.");
        if (isNaN(options.amount)) throw new TypeError("Amount must be a number");

        let users = await Card.find({ vip: false }).sort([['caramelos', 'descending']]).exec();

        let content = users.slice(0, options.amount);
        
        if(options.guild) {
            let array = []

            for(let i = 0;i < content.length;i++) {
                if(guild.members.cache.get(content[i].user)) array.push(content[i])
            }
            content = array
        }
            
        

        return content
    }

module.exports = {
    pay,
    add,
    remove,
    newAccount,
    view,
    generateLeaderboard
}

