const bundles = [
  { img:"https://cdn.supercell.com/supercell.com/21082023/skins/judgement_king.png", name:"Judgement King + War Machine Scenery", desc:"November Gold Pass Bundle" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/skins/anime_royal_champion.png", name:"Anime Royal Champion + Anime Scenery", desc:"August Gold Pass Bundle" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/sceneries/shadow_scenery.png", name:"Shadow Scenery", desc:"Dark & mysterious base design" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/sceneries/space_scenery.png", name:"Space Scenery", desc:"Futuristic galaxy theme base" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/sceneries/jungle_scenery.png", name:"Epic Jungle Scenery", desc:"Lush and adventurous theme" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/skins/pirate_champion.png", name:"Pirate Champion + Pirate Scenery", desc:"Arrr! Clash on the high seas" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/skins/winter_queen.png", name:"Winter Queen + Snowy Scenery", desc:"Festive holiday themed bundle" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/sceneries/legendary_scenery.png", name:"Legendary Scenery", desc:"The rarest base theme yet" }
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
      <button onclick="openLogin()">Claim Now</button>
    </div>`;
  container.appendChild(card);
});

function openLogin(){
  document.getElementById('loginModal').style.display='flex';
}
