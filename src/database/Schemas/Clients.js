const mongoose = require('mongoose');

const guildConfigSchema = mongoose.Schema({
client: { type: mongoose.SchemaTypes.Number, default: 0},
manu: {type: mongoose.SchemaTypes.String, default: 'false'},
reason: {type: mongoose.SchemaTypes.String, default: 'preguiça'},
});

module.exports = mongoose.model('clients', guildConfigSchema);