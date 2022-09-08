const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ShopISchema = new Schema({
  _id: { type: String },
  Name: { type: String},
  Price: { type: Number, default: 200},
  Description: { type: String},
  Image: { type: String}
});

const ShopI = mongoose.model("ShopsItems", ShopISchema);
module.exports = ShopI;