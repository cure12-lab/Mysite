const bundles = [
  { img:"https://static.wikia.nocookie.net/clashofclans/images/6/6d/Judgement_King_Skin.png", name:"Judgement King + War Machine Scenery", desc:"November Gold Pass Bundle", link:"/login.html" },
  { img:"https://static.wikia.nocookie.net/clashofclans/images/0/0f/Anime_Royal_Champion_Skin.png", name:"Anime Royal Champion + Anime Scenery", desc:"August Gold Pass Bundle", link:"/login.html" },
  { img:"https://static.wikia.nocookie.net/clashofclans/images/2/20/Shadow_Scenery.png", name:"Shadow Scenery", desc:"Dark & mysterious base design", link:"/login.html" },
  { img:"https://static.wikia.nocookie.net/clashofclans/images/1/1d/Space_Scenery.png", name:"Space Scenery", desc:"Futuristic galaxy theme base", link:"/login.html" },
  { img:"https://static.wikia.nocookie.net/clashofclans/images/e/e1/Jungle_Scenery.png", name:"Epic Jungle Scenery", desc:"Lush and adventurous theme", link:"/login.html" },
  { img:"https://static.wikia.nocookie.net/clashofclans/images/a/a2/Pirate_Champion_Skin.png", name:"Pirate Champion + Pirate Scenery", desc:"Arrr! Clash on the high seas", link:"/login.html" },
  { img:"https://static.wikia.nocookie.net/clashofclans/images/7/75/Winter_Queen_Skin.png", name:"Winter Queen + Snowy Scenery", desc:"Festive holiday themed bundle", link:"/login.html" },
  { img:"https://static.wikia.nocookie.net/clashofclans/images/3/36/Legendary_Scenery.png", name:"Legendary Scenery", desc:"The rarest base theme yet", link:"/login.html" }
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
