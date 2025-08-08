let currentProduct = null;
let currentEmail = '';
let isNewUser = false;

function buyProduct(id){
    currentProduct = id;
    const popup = document.getElementById('loginPopup');
    popup.style.display='flex';
    popup.style.justifyContent='center';
    popup.style.alignItems='center';
}

function checkEmail(){
    currentEmail = document.getElementById('loginEmail').value.trim();
    if(!currentEmail){
        alert('Please enter an email');
        return;
    }
    fetch('/auth/step1',{
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:`email=${encodeURIComponent(currentEmail)}`
    })
    .then(r=>r.json())
    .then(d=>{
        isNewUser = !d.exists;
        document.querySelector('.step-email').style.display='none';
        document.querySelector('.step-password').style.display='block';
        document.getElementById('loginTitle').innerText = d.exists ? 'Welcome Back' : 'Create Account';
    })
    .catch(err=>console.error(err));
}

function finishLogin(){
    const password=document.getElementById('loginPassword').value.trim();
    if(!password){
        alert('Please enter a password');
        return;
    }
    fetch('/auth/step2',{
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:`email=${encodeURIComponent(currentEmail)}&password=${encodeURIComponent(password)}&isNew=${isNewUser}`
    })
    .then(r=>r.json())
    .then(d=>{
        if(d.success){
            fetch('/buy/'+currentProduct,{method:'POST'})
            .then(r=>r.json())
            .then(res=>{
                if(res.success){
                    window.location.href = res.redirect;
                }else if(res.loginRequired){
                    alert('Please log in first.');
                }
            });
        }else{
            alert(d.message);
        }
    })
    .catch(err=>console.error(err));
}

// Countdown Timer
const countdownElement = document.getElementById('countdown');
if(countdownElement){
    let time = 7200;
    setInterval(()=>{
        let h = Math.floor(time/3600);
        let m = Math.floor((time%3600)/60);
        let s = time%60;
        countdownElement.innerText = \`\${h}h \${m}m \${s}s\`;
        time--;
    },1000);
}
