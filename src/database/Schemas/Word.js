const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let WordSchema = new Schema({
    guildID: { type: String },
    word: { type: String },
});

const Word = mongoose.model("words", WordSchema);
module.exports = Word;