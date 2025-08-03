const bundles = [
  { img:"https://cdn.supercell.com/supercell.com/21082023/skins/judgement_king.png", name:"Judgement King + War Machine Scenery", desc:"November Gold Pass Bundle", link:"/login.html" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/skins/anime_royal_champion.png", name:"Anime Royal Champion + Anime Scenery", desc:"August Gold Pass Bundle", link:"/login.html" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/sceneries/shadow_scenery.png", name:"Shadow Scenery", desc:"Dark & mysterious base design", link:"/login.html" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/sceneries/space_scenery.png", name:"Space Scenery", desc:"Futuristic galaxy theme base", link:"/login.html" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/sceneries/jungle_scenery.png", name:"Epic Jungle Scenery", desc:"Lush and adventurous theme", link:"/login.html" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/skins/pirate_champion.png", name:"Pirate Champion + Pirate Scenery", desc:"Arrr! Clash on the high seas", link:"/login.html" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/skins/winter_queen.png", name:"Winter Queen + Snowy Scenery", desc:"Festive holiday themed bundle", link:"/login.html" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/sceneries/legendary_scenery.png", name:"Legendary Scenery", desc:"The rarest base theme yet", link:"/login.html" }
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
