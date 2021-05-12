const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const subscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: {type: String, required:true},
    payment:  {type: Number, required: true}
  }
);
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  cart: {
    type: Array,
    default: []
},
  reviews: {type: Array, default: []},
  reservation: {type: Array, default: []},
  isSubscribed: {type: Boolean, default:false},
  role:{type:Number},
  subscription:{type: subscriptionSchema, default: null}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
