const bundles = [
  { img:"https://i.imgur.com/3O6HhQf.jpg", name:"Judgement King + War Machine Scenery", desc:"November Gold Pass Bundle", link:"/login.html" },
  { img:"https://i.imgur.com/3yJeuyQ.jpg", name:"Anime Royal Champion + Anime Scenery", desc:"August Gold Pass Bundle", link:"/login.html" },
  { img:"https://i.imgur.com/2rN3Qn3.jpg", name:"Shadow Scenery", desc:"Dark & mysterious base design", link:"/login.html" },
  { img:"https://i.imgur.com/QnP8bd4.jpg", name:"Space Scenery", desc:"Futuristic galaxy theme base", link:"/login.html" },
  { img:"https://i.imgur.com/FJJkXCM.jpg", name:"Epic Jungle Scenery", desc:"Lush and adventurous theme", link:"/login.html" },
  { img:"https://i.imgur.com/7JQhL7q.jpg", name:"Pirate Champion + Pirate Scenery", desc:"Arrr! Clash on the high seas", link:"/login.html" },
  { img:"https://i.imgur.com/xWxElUk.jpg", name:"Winter Queen + Snowy Scenery", desc:"Festive holiday themed bundle", link:"/login.html" },
  { img:"https://i.imgur.com/ULuCwuk.jpg", name:"Legendary Scenery", desc:"The rarest base theme yet", link:"/login.html" }
];
const container = document.querySelector('.offers');
bundles.forEach(b => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${b.img}" alt="${b.name}">
    <div class="card-content">
      <h3>${b.name}</h3>
      <p>${b.desc}</p>
      <button onclick="location.href='${b.link}'">Claim Now</button>
    </div>`;
  container.appendChild(card);
});
