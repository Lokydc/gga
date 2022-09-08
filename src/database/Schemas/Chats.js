const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ChatSchema = new Schema({
    guildID: { type: String },
    chat: { type: String },
});

const Chat = mongoose.model("chats", ChatSchema);
module.exports = Chat;