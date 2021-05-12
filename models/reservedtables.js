const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservedTablesSchema = new Schema({
  tablenumber: { type: Number, required: true },
  restaurantName: { type: String, required: true},
  date:{ type: String, required: true}
});


module.exports = mongoose.model('reservedTables', reservedTablesSchema);
