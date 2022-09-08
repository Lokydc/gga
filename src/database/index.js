const mongoose = require("mongoose");
const c = require("colors");
const mongoCurrency = require('discord-mongo-currency');
const config = require('../../config.json')

module.exports = {
  start() {
    try {
      
      mongoCurrency.connect(config.MONGO_URI);
      mongoose.connect(config.MONGO_URI);
    } catch (err) {
      if (err) return console.log(c.red(`[ MONGODB ] - ERROR:`, +err));
    }
  },
};