

var mongoose = require('mongoose');
const subscriptionCodeSchema = new mongoose.Schema ({
    
    Code: {type: String, required:true},
    Pourcentage: {type: Number, required:true},
    PaymentId: {type: Number, required: true}
})

module.exports = mongoose.model('SubscriptionCodes', subscriptionCodeSchema);