const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ====== DATABASE CONNECTION ======
mongoose.connect(mongodb+srv://sittubittus:<db_W6PXYmt8tefZ7f4q>@cluster0.ss60ylm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ====== SCHEMA ======
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model("User", UserSchema);

// ====== REAL API ROUTES ======
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  res.json({ success: true, message: "User registered" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ====== DEFAULT ROUTE ======
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
