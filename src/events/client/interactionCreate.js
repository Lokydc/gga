const Event = require('../../structures/Event')
const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js')
const data = require('../../database/Schemas/User')
const Guild = require('../../database/Schemas/Guild')
const Economy = require('../../../packages/economy')
let div = 0
const coins = require('discord-mongo-currency')
module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = async (interaction) => {
        if (interaction.isCommand() || interaction.isContextMenu()) {

            console.log(interaction.id)
            //if(this.client.user.id === '960344090241798155' && interaction.channel.id !== '977363339728531457' && interaction.user.id !== '947856944515936306') return interaction.reply({ content: `\🤖 | *Meus comandos só pedem ser utilizados no chat:* <#977363339728531457>`, ephemeral: true})
            if (!interaction.guild) return;

            const guilda = await Guild.findOne({ 
                server: interaction.guild.id
            })

            let user = await data.findOne({
                user: interaction.user.id
            });

            let economy = await Economy.view(interaction.user);

            if(!economy || !guilda || !user) return allData(interaction)


            this.t = await this.client.getTranslate(interaction.guild.id)
            const cmd = this.client.commands.find(c => c.name === interaction.commandName)
            
            if (cmd) {
                if(user.status.blacklist.status === true) return interaction.reply({ content: 'ban?', ephemeral: true}) 
                if(!interaction.member.permissions.has(cmd.userPerms || [])) return interaction.reply({ content: `${this.t('commands:lang.noperm', {perms: cmd.userPerms.join(',')})}`, ephemeral: true})
                if(!interaction.guild.me.permissions.has(cmd.botPerms || [])) return interaction.reply({ content: `${this.t('commands:lang.nopermBOT', {perms: cmd.botPerms.join(',')})}`})
                    try {
                  cmd.run(interaction, this.t)
                        } catch (err) {
                            interaction.reply({ content: `Error ,\n\`\`\`\n${err}\`\`\``})
                            }
                    console.log(`User: ${interaction.user.tag} (${interaction.user.id}) guild: ${interaction.guild.name} (${interaction.guild.id}) Comando: ${cmd.name}`)
                        
                            
            }
            

                
                            
        }
    }
}
async function allData(interaction) {

    const guilda = await Guild.findOne({ 
        server: interaction.guild.id
    })

    let user = await data.findOne({
        user: interaction.user.id
    });

    let economy = await Economy.view(interaction.user);
    if(!guilda) {
        let novo = new Guild({
            server: interaction.guild.id
        })
    
        novo.save()
    }

    if(!user) {
        let hu = new data({
            user: interaction.user.id,
        })
    
        hu.save()
    }

    if(!economy) {
        await Economy.newAccount(interaction.user)
    }

    interaction.reply({ content: ':flag_us: I just created your data and your server\'s data in the database\n:flag_br: acabei de criar os dados seus e de seu servidor na database', ephemeral: true})
}
