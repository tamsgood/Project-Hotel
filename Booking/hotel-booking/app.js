const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/booking');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/hotelBooking', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use booking routes
app.use('/api', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
