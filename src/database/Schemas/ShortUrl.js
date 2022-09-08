const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ShortSchema = new Schema({
    short: { type: String, default: null },
    redirect: { type: String, default: null },
    clicks: { type: Number, default: 0 },
    author: { type: String, default: null },
});

const Short = mongoose.model("Shorts", ShortSchema);
module.exports = Short;