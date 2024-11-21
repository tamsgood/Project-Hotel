const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/accountsystem', { useNewUrlParser: true, useUnifiedTopology: true });

// Skema User
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', UserSchema);

// Endpoint Register
app.post('/register', async (req, res) => {
    const { username, password, phone, email, repeatPassword } = req.body;
    if (password !== repeatPassword) return res.status(400).send('Passwords do not match');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, phone, email });
    await user.save();
    res.status(201).send('User registered');
});

// Endpoint Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
