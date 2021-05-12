const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const paymentSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    cardNumber:{
        type: String,
        required: true
    },
    monthExpiration:{
        type: String,
        required: true
    },
    yearExpiration:{
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: []
    }


}, { timestamps: true })

paymentSchema.plugin(uniqueValidator);

module.exports= mongoose.model('Payment', paymentSchema);