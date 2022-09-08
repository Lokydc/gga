const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ShopSchema = new Schema({
  _id: { type: String },
  Name: { type: String },
  Itens: { type: Number, default: 0 },
  Embed: {
      image: { 
          link: { type: String,  default: 'https://cdn.discordapp.com/attachments/886351055456194571/886351337950965860/thumb-1920-909912.png'},
          aprova: { type: String, default: 'on'}
      },

      description: {
          text: { type: String, default: 'Descrição da loja'},
          aprova: { type: String, default: 'on'}
      },

      thumbnail: {
          link: { type: String, default: 'https://cdn.discordapp.com/attachments/862566063090171995/886727763560661022/1f937-2642.png'},
          aprova: { type: String, default: 'on'}
      },

      footer: { 
          text: { type: String, default: 'Footer da loja'},
          aprova: { type: String, default: 'on'}
      },
      
      color: { type: String, default: 'YELLOW'},
  },
});

const Shop = mongoose.model("Shops", ShopSchema);
module.exports = Shop;