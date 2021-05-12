const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TablesNumberSchema = new Schema({
  restaurantName: { type: String, required: true},
  image: {type: String, required: true},
  description: {type: String, required: true},
  numberOfTables: {type: Array, required:true}
});

module.exports = mongoose.model('TablesNumber', TablesNumberSchema);
