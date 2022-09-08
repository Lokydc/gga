const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  user: { type: String },
  server: { type: String },
  commands: { type: Number, default: 0 },
  invites: {
    total: { type: Number, default: 0},
    real: {type: Number, default: 0},
    leave: { type: Number, default: 0},
    fake: { type: Number, default: 0}
  },
  ships: { type: Array, default: []},
  roleplay: {
    hug: {
      recebido: {type: Number, default: 0},
      enviado: {type: Number, default: 0},
    },
    slap: {
      recebido: {type: Number, default: 0},
      enviado: {type: Number, default: 0},
    },
    kiss: {
      recebido: {type: Number, default: 0},
      enviado: {type: Number, default: 0},
    },
    attack: {
      recebido: {type: Number, default: 0},
      enviado: {type: Number, default: 0},
    },
    dance: {
      recebido: {type: Number, default: 0},
      enviado: {type: Number, default: 0},
    }
  },
  badges: { type: Array, default: ["CARAMELO"]},
  conflip: {
    joins: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    over: { type: Number, default: 0},
    valueWin: { type: Number, default: 0 },
    valueOver: { type: Number, default: 0 },
    total: {type: Number, default: 0},
  },
  status: { 
    premium: {
      status: {type: Boolean, default: false},
      type: {type: String, default: 'false'}
    },
    blacklist: { 
      status: { type: Boolean, default: false },
      time: { type: Number, default: Date.now() },
      motivo: { type: String, default: 'nada ainda'}
  },
   staff: { 
     perm: { type: Boolean, default: false },
     level: { type: Number, default: 0 }
    },
    afk: {
      status: { type: Boolean, default: false },
      message: { type: String, default: 'Sem motivo especificado'}
     },
   },
  profile: {
  backgrounds: { type: Array, default: []},
  reps: {
    count: {type: Number, default: 0},
    time: {type: Number, default: 0},
    myReps: {type: Array, default: []},
  },
  daily: {
    count: {type: Number, default: 0},
    time: {type: Number, default: 0},
   },
  safeTheEarth: { 
    count: {type: Number, default: 0},
    time: {type: Number, default: 0},
   },
  vip: { 
    count: {type: Number, default: 0},
    time: {type: Number, default: 0},
   },
  marry: {
    status: { type: String },
    parent: { type: String },
    time: { type: Number, default: Date.now() },
    kid: {
      name: { type: String, default: 'nenhum' },
      idade: { type: Number, default: 0 },
      sexo: { type: String, default: 'nenhum' },
    },
    kidTwo: {
      name: { type: String, default: 'nenhum' },
      idade: { type: Number, default: 0 },
      sexo: { type: String, default: 'nenhum' },
    },
    kidVip: {
      name: { type: String, default: 'nenhum' },
      idade: { type: Number, default: 0 },
      sexo: { type: String, default: 'nenhum' },
    },
  },
  layout: {
    background: { type: String, default: 'https://i.imgur.com/mAuJOud.png'},
    sobremim: { type: String, default: 'A Jujuba é fofa! ,  personalize com /profile aboutme'},
  },
  },
  ticket: {
    count: {type: Boolean, default: false},
  },
  message: { type: Number, default: 0 }
});

const User = mongoose.model("Users", userSchema);
module.exports = User;