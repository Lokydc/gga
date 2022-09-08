const mongoose = require("mongoose");

const LevelRoleSchema = new mongoose.Schema({
  guildID: { type: String },
  role: { type: String, default: null },
  level: {type: Number, default: null },
});

module.exports = mongoose.model('LevelsRoles', LevelRoleSchema);