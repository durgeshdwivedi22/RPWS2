// server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // for hashing passwords
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// ---------------- MONGODB SETUP ----------------
mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.log('❌ MongoDB connection error:', err));

// ---------------- MIDDLEWARE ----------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // serve static files (HTML, CSS, JS)

// ---------------- USER MODEL ----------------
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// ---------------- ROUTES ----------------

// Serve login/signup page first
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve main page
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---------------- SIGN UP ----------------
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.send('All fields are required. <a href="/">Go back</a>');
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send('Email already registered. <a href="/">Try again</a>');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Redirect to main page
        res.redirect('/index.html');
    } catch (err) {
        console.log(err);
        res.send('Server error. <a href="/">Try again</a>');
    }
});

// ---------------- SIGN IN ----------------
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.send('All fields are required. <a href="/">Go back</a>');
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.send('User not found. <a href="/">Sign Up</a>');
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send('Incorrect password. <a href="/">Try again</a>');
        }

        // Redirect to main page after successful login
        res.redirect('/index.html');
    } catch (err) {
        console.log(err);
        res.send('Server error. <a href="/">Try again</a>');
    }
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
