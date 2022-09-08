const mongoose = require('mongoose');

const guildConfigSchema = mongoose.Schema({
user: { type: mongoose.SchemaTypes.Number, default: 0},
transaction: {type: mongoose.SchemaTypes.String, default: 'nada'},
});

module.exports = mongoose.model('transactions', guildConfigSchema);