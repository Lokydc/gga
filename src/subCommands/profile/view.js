const {
    MessageEmbed
} = require("discord.js");
const Discord = require("discord.js");
const Canvas = require('canvas')
const Command = require('../../structures/Command')
const bitcoin = require('discord-mongo-currency')
const Textbox = require('@borgar/textbox')
const economy = require('../../../packages/economy')
const Utils = require("../../util/Util.js")

//const Levels = require('discord-xp')
const User = require('../../database/Schemas/User')
//const config = require("../../botconfig/config.json");

const { registerFont } = require('canvas')
registerFont('helsinki.ttf', { family: 'helsinki' })
registerFont('IndieFlower-Regular.ttf', { family: 'indieFlower-Regular'}) //Segoe UI Black
registerFont('Segoe UI Black.ttf', { family: 'Segoe UI Black'})

module.exports = async (client, interaction, t) => {
        
        let user = interaction.options.getUser('user')
        if(!user) user = interaction.user;

        const usac = await User.findOne({
            user: user.id
        });

        const button1 = new Discord.MessageButton()
        .setLabel(`${t('buttons:profile.send')}`)
        .setStyle('PRIMARY')
        .setCustomId('rep')
        .setEmoji('<:coracao1:1010182419237847080>')

        const row = new Discord.MessageActionRow().addComponents(button1)

        await interaction.deferReply()

        const attachment = await getProfile(user, usac, client)

        let cnts = user === interaction.user ? `${t('commands:profile.desc')}` : `${t('commands:profile.desc2', {user: user.tag})}`
        let msg = await interaction.editReply({content: `${cnts}`,files: [attachment], components: [row], fetchReply: true})

        const filter = user => user
        const collector = msg.createMessageComponentCollector({ filter: filter, time: 120000})

        collector.on('collect', async (i) => {
          if(i.user === interaction.user) return i.reply({ content: `${t('commands:reputation.simesmo')}`, ephemeral: true})

          if(i.customId === 'rep') {

        let authorData = await User.findOne({ user: i.user.id })
        if(authorData) {
        let timeout = 3600000
        let repTim = authorData.profile.reps.time

        if(repTim !== null && timeout - (Date.now() - repTim) > 0) {
          i.reply({ content: `${t('commands:reputation:timeout')}`, ephemeral: true})
        } else {
          usac.profile.reps.count++
          //usac.profile.reps.myReps.push(`📥 Recebeu uma rep de ${i.user.tag}`)
          authorData.profile.reps.time = Date.now()
          //authorData.profile.reps.myReps.push(`📤 Enviou uma rep para ${interaction.user.tag}`)
          usac.save()
          authorData.save()
          i.reply({ content: `🔥 ${i.user} ${t('commands:reputation.sent')} ${interaction.user}`})
        }
            } else {
              i.reply({ content: `${t('commands:reputation.err')}`, ephemeral: true})
            }
          }


        })

        
    }
    
function shorten(text, len) {
    if (text.length <= len) return text;
    return text.substr(0, len).trim() + "...";
  }

async function getProfile(user, usac, cliente) {
              
  const canvas = Canvas.createCanvas(800, 600)
  const ctx = canvas.getContext("2d")
          
  let avatar = user.displayAvatarURL({ dynamic: false, format: "png", size: 1024 });
          
  let a = 'https://i.imgur.com/mAuJOud.png'
  if(usac) a = usac.profile.layout.background
  let fundo = await 
  Canvas.loadImage(a)
  ctx.drawImage(fundo, 0, 0, canvas.width, canvas.height)
  
  const TargetAvatar = await Canvas.loadImage(`${avatar}`)
  ctx.drawImage(TargetAvatar, 25, 10, 150, 150)

  let profil = usac?.profile.marry.status === 'casado' ? 'profile_marry.png' : 'profile.png'
  let layout = await 
  Canvas.loadImage(`./src/images/profile/${profil}`)
  ctx.drawImage(layout, 0, 0, canvas.width, canvas.height)

  let corNick = '#F8F8F8' 
  ctx.textAlign = "left"
  ctx.font = '40px Segoe UI Black';
  ctx.fillStyle = corNick;
  await Utils.renderEmoji(ctx, shorten(user.username, 15), 320, 45);


  let coins = await economy.view(user)

  ctx.textAlign = "left"
  ctx.font = '30px Segoe UI Black';
  ctx.fillStyle = '#F8F8F8'
  await Utils.renderEmoji(ctx, shorten(coins ? `🪙 ${coins.format} | #${coins.position}` : '🪙 0,000,000 | #0', 20), 320, 100);

  

  if(profil === 'profile_marry.png') {
  let usermarry = cliente.users.cache.get(usac.profile.marry.parent)
  if(usermarry) { 
  ctx.textAlign = "left"
  ctx.font = '30px Segoe UI Black';
  ctx.fillStyle = corNick;
  await Utils.renderEmoji(ctx, shorten(usermarry.username, 12), 602, 136);
  }
  }
  
  let reputation = usac ? usac.profile.reps.count : 0
  if(reputation > 998) reputation = 999

  ctx.textAlign = "left"
  ctx.font = '40px Segoe UI Black';
  ctx.fillStyle = '#FFFFFF';
  await Utils.renderEmoji(ctx, `${reputation} reps`, 645, 435);

  let aboutme = usac ? usac.profile.layout.sobremim : 'A Jujuba é fofa! ,  personalize com /profile aboutme'
  
  ctx.textAlign = "left"
  ctx.font = '22px Segoe UI Black';
  ctx.fillStyle = '#2e2d2d';
  await Utils.renderEmoji(ctx, `${shorten(aboutme, 90)}`, 10, 500)
          
  let list = [];
          
  const flags = user.flags === null ? "" : user.flags.toArray()
  list.push(flags)
  
  let onwer = '947856944515936306'
          
  if(user.id === onwer) list.push("EARLY_VERIFIED_DEVELOPER")

  if(usac) {
    if(usac.status.staff.perm === true) {
      list.push("ADMIN")
    }

    if(usac.status.premium.status === true) {
      list.push("VIP")
    }

    for(let i = 0;i < usac.badges.length;i++) {
      list.push(`${usac.badges[i]}`)
    }
  }

  

  list = list.join("")
  .replace("EARLY_VERIFIED_DEVELOPER", '<:dev:874717224047374417>')
  .replace("HOUSE_BRAVERY", '<:HypeSquadBravery:878201508032827423>')
  .replace("HOUSE_BRILLIANCE", '<:HypeSquadBrilliance:879899227034120253>')
  .replace("HOUSE_BALANCE", '<:HypeSquadBalance:878201328101392394>')
  .replace("VERIFIED_BOT", '<:emoji_23:989282906834870282>')
  .replace("ADMIN", '<:Javascript:883757487931670598>')
  .replace("TESTES", '<:TCC_IconBugHunterBadge:879901392779739216>')
  .replace("VIP", "<:vipd:904818002988531762>")
  .replace("GRATIAN", "<:gratian:962487783518273536>")
  .replace("CARAMELO", "<:jujuba_wow:981613679843885056>")
  .replace("BOT_HTTP_INTERACTIONS", "<:svg:1012917259028664390>")
  
  

  ctx.textAlign = "left"
  ctx.font = `32px "helsinki"`
  await Utils.renderEmoji(ctx, list.split(",").join(" "), 135, 453);

  const buffer = canvas.toBuffer()

  if(!buffer) return undefined

  
  const attachment = new Discord.MessageAttachment(buffer, `profile.jpg`)

  return attachment
}