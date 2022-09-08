const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let FundoSchema = new Schema({
  user: { type: String, default: 'stop'},
  info: []
});

const Fundo = mongoose.model("Fundos", FundoSchema);
module.exports = Fundo;