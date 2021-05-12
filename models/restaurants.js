var mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    productImg: {type: String, required: true},
    quantity: {type:Number, default: 1}
  }
);

const collectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    Products:  [productsSchema]
  }
);

const restaurantSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 50
},
logoImage: { 
  type: String,
  default: null
},
profileImage: {
    type: String,
    default: null
},
collections: [collectionSchema],
restaurantImages: {type: Array, default: null},
openTime: {type: String },
location: {type: String},
TelNumber: {type: Number},
KnownFor: {type: String},
latitude: {type:Number},
longtitude: {type:Number}
}, { timestamps: true })



module.exports = mongoose.model('Restaurant', restaurantSchema);
