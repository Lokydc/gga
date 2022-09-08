const { Client } = require('discord.js')

const { readdirSync } = require('fs')
const { join } = require('path')
const Locale = require('../../packages/Locale')
const Guild = require('../database/Schemas/Guild')

module.exports = class extends Client {
    constructor(options) {
        super(options)

        this.commands = []
        this.logs = []
        this.loadCommands()
        this.loadEvents()
    }

    

    

    registryCommands() {
        this.application.commands.set(this.commands)
    }



    loadCommands(path = 'src/commands') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`)

            for (const command of commands) {
                const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
                const cmd = new (commandClass)(this)

                this.commands.push(cmd)
            }
        }
    }
    loadEvents(path = 'src/events') {
        const categories = readdirSync(path)

        for (const category of categories) {
            const events = readdirSync(`${path}/${category}`)

            for (const event of events) {
                const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
                const evt = new (eventClass)(this)

                this.on(evt.name, evt.run)
            }
        }
    }

    async getLanguage(firstGuild) {
        if (!firstGuild) return;
        const guild = await Guild.findOne({
          server: firstGuild,
        });
    
        if (guild) {
          let lang = guild.botconfig.language;
    
          if (lang === undefined) {
            guild.botconfig.language = "portuguese";
            guild.save();
    
            return "portuguese";
          } else {
            return lang;
          }
        } else {
          await Guild.create({ server: firstGuild });
    
          return "portuguese";
        }
      }
    
      async getActualLocale() {
        return this.t;
      }
    
      async setActualLocale(locale) {
        this.t = locale;
      }
    
      async getTranslate(guild) {
        const language = await this.getLanguage(guild);
    
        const translate = new Locale("src/languages");
    
        const t = await translate.init({
          returnUndefined: false,
        });
    
        translate.setLang(language);
    
        return t;
      }

    }
    