const mongoose = require('mongoose');

const guildConfigSchema = mongoose.Schema({
    guild: { type: String},
    embeds: { type: Array, default: []},
    admins: { type: Array, default: []}
});

module.exports = mongoose.model('embeds', guildConfigSchema);