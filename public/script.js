const bundles = [
  { img:"https://cdn.supercell.com/supercell.com/21082023/skins/judgement_king.png", name:"Judgement King Bundle", desc:"November Gold Pass Exclusive" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/skins/anime_royal_champion.png", name:"Anime Royal Champion", desc:"Anime-themed Royal Champion skin" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/sceneries/shadow_scenery.png", name:"Shadow Scenery", desc:"Dark mysterious village layout" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/sceneries/space_scenery.png", name:"Space Scenery", desc:"Clash in the cosmos!" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/sceneries/jungle_scenery.png", name:"Jungle Scenery", desc:"Adventure in the wild jungle" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/skins/pirate_champion.png", name:"Pirate Champion Bundle", desc:"Set sail for victory!" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/skins/winter_queen.png", name:"Winter Queen", desc:"Freeze your enemies in style" },
  { img:"https://cdn.supercell.com/supercell.com/21082023/sceneries/legendary_scenery.png", name:"Legendary Scenery", desc:"Rare legendary village theme" }
];
const container = document.querySelector('.offers');
bundles.forEach(b => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${b.img}" alt="${b.name}">
    <h3>${b.name}</h3>
    <p>${b.desc}</p>
    <button onclick="openLogin()">Claim Now</button>
  `;
  container.appendChild(card);
});
function openLogin(){
  document.getElementById('loginModal').style.display='flex';
}
