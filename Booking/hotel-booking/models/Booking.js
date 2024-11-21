const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    roomType: { type: String, required: true },
    rentalType: { type: String, enum: ['perhari', 'perjam'], required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date },
    guests: {
        adults: { type: Number, min: 1, max: 2, required: true },
        children: { type: Number, min: 0, max: 1 }
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
