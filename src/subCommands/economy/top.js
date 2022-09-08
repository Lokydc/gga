const Discord = require("discord.js")
const Canvas = require("canvas")
const { registerFont } = require('canvas')
registerFont('Segoe UI Black.ttf', { family: 'osvaldo' })
const db = require('../../../packages/economy')
const Utils = require("../../util/Util.js")

module.exports =  async (client, interaction, t) => {
    const page = interaction.options.getNumber('page')

    await interaction.deferReply()
    let usersDB = await db.generateLeaderboard({ amount: 10})

    if(!usersDB) return interaction.editReply({ content: `${t('commands:top.nousers')}`})
    usersDB.sort((a,b) => b.caramelos - a.caramelos)
    usersDB = usersDB.slice(page === 2 ? 5 : 0, page === 2 ? 10 : 5)
    
    const canvas = Canvas.createCanvas(800, 600)
    const ctx = canvas.getContext("2d")
        
    const serverIcon = await Canvas.loadImage(interaction.guild.iconURL({ format: 'png', size: 1024}))
    ctx.drawImage(serverIcon, 515, -102.5, 285, 285)
    
    const background = await Canvas.loadImage("https://i.imgur.com/bNJr9qM.png")
    ctx.drawImage(background, 0, 75, canvas.width, canvas.height)

    const layout = await Canvas.loadImage("https://i.imgur.com/RCBNEMa.png")
    ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)

    ctx.font = '33px osvaldo';
    ctx.fillStyle = '#F8F8F8';
    ctx.fillText(`${interaction.guild.name}`, 265 - interaction.guild.name.length * 8, 50)
    
    for(let i = 0; i < usersDB.length; i++){

    const user = await client.users.cache.get(usersDB[i].user)
     if(user) {
        
    const cordenada = i * 105
    ctx.save()

    ctx.font = '40px osvaldo';
    ctx.fillStyle = '#F8F8F8';
    Utils.renderEmoji(ctx, user.username ? user.username : 'DeletedUser#0000', 290, cordenada + 115)
    ctx.font = '32px osvaldo';
    ctx.fillText(`${format(usersDB[i].caramelos ? usersDB[i].caramelos : 0)} caramelos`, 300, cordenada + 150)
    ctx.font = '24px osvaldo';
    ctx.fillText(`ID: ${user.id ? user.id : '00000000000000'}`, 310, cordenada + 175)
     
    ctx.beginPath(); 
    ctx.moveTo(0, cordenada + 75);
    ctx.lineTo(265, cordenada + 75);
    ctx.lineTo(285, cordenada + 180);
    ctx.lineTo(0, cordenada + 180);
    ctx.lineTo(0, cordenada + 75);
    ctx.closePath(); 
    ctx.clip();

    const userAvatar = await Canvas.loadImage(`${user.displayAvatarURL({ format: 'png', size: 1024})}`) 
    ctx.drawImage(userAvatar, 0, cordenada, 285, 285)
    ctx.restore()
     } else {
        continue;
     }
     }
    
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'TopMoneyJujuba.png')
    await interaction.editReply({ files: [attachment]})
 
   }

  function format(value) {
    if(typeof value !== 'number') return 'Inválid'
    let internationalNumberFormat = new Intl.NumberFormat('en-US')
    return internationalNumberFormat.format(value)
}
