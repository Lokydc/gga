const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let GuildSchema = new Schema({
  server: { type: String },
  blacklist: { 
    status: {type: Boolean, default: false},
    motivo: {type: Boolean, default: false }
  },
  webhook: {
    token: { type: String, default: undefined },
    id: { type: String, default: undefined },
    channel: { type: String, default: undefined }
  },
  youtube: {
    status: {type: Boolean, default: false},
    channel: {type: String, default: null },
    notifications: {type: Array, default: []},
  },
  ownerid: { type: String, default: '3243' },
  botconfig: {
    block: {
      status: {type: Boolean, default: false},
      words: { type: Array, default: []}
    },
    prefix: { type: String, default: 'j'},
    chatpremission: {
      chats: { type: Array, default: []},
      status: {type: Boolean, default: false }
    },
    antilink: {
      status: {type: Boolean, default: false},
      admins: {type: Array, default: []},
    },
    welcome: {
      status: { type: Boolean, default: false },
      channel: { type: String, default: 'zero'},
      autorole: {
        roles: { type: Array, default: []},
        status: { type: Boolean, default: false },
      },
      message: { type: String, default: '{@user} Seja bem vindo ao {guild.name}, \nVocê é o membro #{guild.memberCount}, espero que goste do nosso servidor!'}
    },
    leave: {
      channel: { type: String, default: 'zero'},
      status: { type: Boolean, default: false },
    },
    logs: {
      status: { type: Boolean, default: false},
      channel: { type: String, default: 'zero'},
      events: {
        messageUpdate: { type: Boolean, default: false},
        messageDelete: { type: Boolean, default: false},
        channelCreate: { type: Boolean, default: false},
        channelDelete: { type: Boolean, default: false},
        roleCreate: { type: Boolean, default: false},
        roleDelete: { type: Boolean, default: false},
        memberUpdate: { type: Boolean, default: false},
        booster: { 
          status: { type: Boolean, default: false },
          channel: { type: Number, default: 0}
        }
      }
    },
    language: { type: String, default: 'portuguese'},
    invite: {
      status: { type: Boolean, default: false},
      channel: { type: String, default: 'zero'},
      message: {
        type: {
          status: { type: String, default: 'normal'},
          embed: {
            description: { type: String, default: '{user} foi convidado por {inviter} que agora tem {inviter.invites}'}
          },
          normal: { type: String, default: '{user} foi convidado por {inviter} que agora tem {inviter.invites}'}
        }
      }
    }
  },
  games: {
    akinator: {
      channel: { type: String, default: 'nenhum'},
      status: { type: Boolean, default: false },
    },
    machine: {
      channel: { type: String, default: 'nenhum'},
      status: { type: Boolean, default: false }
    }
  }
});

const Guild = mongoose.model("Guilds", GuildSchema);
module.exports = Guild;