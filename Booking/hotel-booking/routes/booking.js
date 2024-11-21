const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Create a new booking
router.post('/book', async (req, res) => {
    const { roomType, rentalType, checkInDate, checkOutDate, guests } = req.body;

    try {
        const booking = new Booking({
            roomType,
            rentalType,
            checkInDate,
            checkOutDate,
            guests
        });
        await booking.save();
        res.status(201).send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).send(bookings);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get booking by ID
router.get('/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).send();
        }
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
