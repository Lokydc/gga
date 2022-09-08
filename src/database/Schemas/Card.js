const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CardSchema = new Schema({
    user: { type: String },
    number: { type: String, default: '000000000000000000'},
    cvv: { type: Number, default: 0},
    caramelos: { type: Number, default: 0},
    vip: { type: Boolean, default: false},
    guild: { type: String, default: '0'}
});

const Card = mongoose.model("cards", CardSchema);
module.exports = Card;