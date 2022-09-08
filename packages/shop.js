const { MessageEmbed } = require('discord.js')

const backgrounds = async () => {
    let backs = [
        {
            name: 'Recicle',
            value: 2000,
            description: 'O Mundo precisa de você, faça a parte da diferença!',
            image: 'https://i.imgur.com/5PutAvk.png'
        },
        {
            name: 'Reino Doce',
            value: 2000,
            description: 'Vai um docinho ai meu bem?',
            image: 'https://i.imgur.com/aw3OzCe.png'
        },
        {
            name: 'Star Wars',
            value: 5000,
            description: 'Vamos a batalha no espaço!',
            image: 'https://i.imgur.com/YfgpEYH.png'
        },
        {
            name: 'Sol Anos 80',
            value: 5000,
            description: 'Bons tempos não é mesmo?',
            image: 'https://i.imgur.com/UlxFWvB.png'
        },
        {
            name: 'Floresta Pixelada',
            value: 7000,
            description: 'Um mundo cheio de pixels!',
            image: 'https://i.imgur.com/sHgfIV9.png'
        }
    ]

    return backs
}

const pages = async () => {
    let arr = await backgrounds()

    let embeds = []

    for(let i = 0; i < arr.length;i++) {
        let emb = new MessageEmbed()
        .setTitle(arr[i].name)
        .setDescription(arr[i].description)
        .setImage(arr[i].image)
        .setFooter({ text: `Preço: ${arr[i].value} | Jujuba Shop`})
        .setColor('DARK_VIVID_PINK')

        embeds.push({
            embed: emb,
            value: arr[i].value,
            image: arr[i].image,
            name: arr[i].name
        })
    }

    return embeds
}

module.exports = {
    backgrounds,
    pages
}