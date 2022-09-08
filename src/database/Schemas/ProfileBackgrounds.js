const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let FundoSchema = new Schema({
  user: { type: Number},
  fundo: { type: Number },
  image: {
      link: String,
      description: String,
      name: String,
  },
});

const Fundo = mongoose.model("profilebackgrounds", FundoSchema);
module.exports = Fundo;