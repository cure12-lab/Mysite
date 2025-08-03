const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb+srv://sittubittus:<db_W6PXYmt8tefZ7f4q>@cluster0.ss60ylm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String,
  password: String
}));

app.post("/api/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ success: true });
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email, password: req.body.password });
  res.json({ success: !!user });
});

app.get("/api/users", async (req, res) => res.json(await User.find()));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

app.listen(process.env.PORT || 3000, () => console.log("Server running"));
