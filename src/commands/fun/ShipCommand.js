const Command = require('../../structures/Command')
const { MessageAttachment } = require('discord.js')
const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ship',
            name_localizations: {"ja": "sexo"},
            description: '[ 🍁 SHIP ] Shippar usuários é minha paixão!',
            description_localizations: {"en-US": "[ 🍁 SHIP ] Shippar users is my passion!"},
            options: [
                {
                    type: 'USER',
                    name: 'user1',
                    description: '1 Qual usuário que você quer shipar?',
                    required: true
                },
                {
                    type: 'USER',
                    name: 'user2',
                    description: '2 Qual usuário que você quer shipar?',
                    required: false
                }
            ]
        })
    }

    run = async (interaction, t) => {
        let membro1 = interaction.options.getUser('user1')
		let membro2 = interaction.options.getUser('user2')

        await interaction.deferReply()

        if(!membro2) membro2 = interaction.user

		if (membro1 === membro2) return interaction.reply({ content: `${t('commands:ship.mention')}`, ephemeral: true});
		let amor = Math.floor(Math.random() * 100);

		let emoticon = {
            60: "https://cdn.discordapp.com/attachments/862566063090171995/886727322496008252/coracao.png",
            40: "https://cdn.discordapp.com/attachments/862566063090171995/886727763560661022/1f937-2642.png",
            20: "https://cdn.discordapp.com/attachments/862566063090171995/886727631133892649/1f62d.png",
            70: "https://cdn.discordapp.com/attachments/862566063090171995/886727322496008252/coracao.png",
            80: "https://cdn.discordapp.com/attachments/862566063090171995/886727322496008252/coracao.png",
            90: "https://cdn.discordapp.com/attachments/862566063090171995/886727322496008252/coracao.png",
            100: "https://cdn.discordapp.com/attachments/862566063090171995/886727322496008252/coracao.png",
            99: "https://cdn.discordapp.com/attachments/862566063090171995/886727322496008252/coracao.png",
            69: "https://cdn.discordapp.com/attachments/862566063090171995/886727322496008252/coracao.png",
            67: "https://cdn.discordapp.com/attachments/862566063090171995/886727322496008252/coracao.png",
        }
	
		const canvas = Canvas.createCanvas(730, 346);
		const ctx = canvas.getContext('2d');
		const emote = await Canvas.loadImage(emoticon[amor] ? emoticon[amor] : "https://cdn.discordapp.com/attachments/862566063090171995/886727763560661022/1f937-2642.png");
		const foto1 = await Canvas.loadImage(
			membro1.displayAvatarURL({ format: 'png' })
		);
		const foto2 = await Canvas.loadImage(
			membro2.displayAvatarURL({ format: 'png' })
		);

        let rand = (amor * 673) / 100

        let img2 = await Canvas.loadImage('./src/images/ship/ship_layout.png')
        ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);

        let grd = ctx.createLinearGradient(0, rand, 200, 0);
        grd.addColorStop(0, "#ac07f2");
        grd.addColorStop(2, "red"); //#a20afa
        grd.addColorStop(0, "#a20afa");
        ctx.fillStyle = grd;
        ctx.fillRect(28, 252, rand,72)

        
        let img = await Canvas.loadImage('./src/images/ship/ship.png')
        ctx.drawImage(foto1, 47, 58, 185, 185);
		ctx.drawImage(foto2, 470, 55, 185, 185);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		ctx.drawImage(emote, 290, 90, 128, 128);

        ctx.textAlign = "center"
        ctx.font = `48px Segoe UI Black`; //sobmim
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(`${amor}%`, 355, 296)

        let kkkk = new Discord.MessageAttachment(canvas.toBuffer(), 'ship.png')

        let c = `${t('commands:ship.desc', {username1: membro1.username, username2: membro2.username, descri: `${membro1.username.substring(membro1.username.length-3, membro1.username.length)}${membro2.username.substr(membro2.username.length - (membro2.username.length / 2))}`})}`
        interaction.editReply({ content: `${c}`,files: [kkkk]});

     }
    }

     /**name: 'ship',
    description: '[ 👤 USER ] Shippar usuários é minha paixão!',
    options: [
        {
            type: 'USER',
            name: 'user1',
            description: '1 Qual usuário que você quer shipar?',
            required: true
        },
        {
            type: 'USER',
            name: 'user2',
            description: '2 Qual usuário que você quer shipar?',
            required: false
        }
    ]
    */
    