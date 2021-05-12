

var mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema ({
    
    userId: {type: String, required:true},
    marketName: {type: String, required:true},
    reservedBy: {type: String, required:true},
    reservationDate: {type: String, required:true},
    numberOfPeople: {type: Number, required: true},
    otherComments: {type: String, required: false}
})

module.exports = mongoose.model('Reservation', reservationSchema);